'use client';

import { renderToStaticMarkup } from 'react-dom/server';
import {
  GeoJSON,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { useMapContext } from '@/context/map';
import { Feature } from 'geojson';
import L, { Icon, LatLng, Layer, LeafletEvent } from 'leaflet';
import { useTranslations } from 'next-intl';

import { Icons, propsForSVGPresentation } from './icons';
import { DefaultMarker } from './map/default-marker';
import { ObservationMarker } from './map/observation-marker';
import Popup from './map/popup';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

export default function SearchMap() {
  const params = useParams();
  useEffect(() => {
    // We must fire a resize event for leaflet which can not calculate the width of the available space
    window.dispatchEvent(new Event('resize'));
  }, [params]);

  const pathName = usePathname();
  const { settings, layers, setMap } = useMapContext();
  const t = useTranslations('map');

  if (settings === null) {
    return null;
  }

  const { container, baseLayers } = settings;

  const handleReady = (event: LeafletEvent) => {
    // Geolocate
    L.control
      .locate({
        locateOptions: {
          enableHighAccuracy: true,
        },
        strings: {
          title: t('geolocate'),
        },
        position: 'bottomright',
      })
      .addTo(event.target);
  };

  const pointToLayerHandler = (feature: Feature, latlng: LatLng) => {
    const icon =
      feature.properties?.type?.pictogram ??
      renderToStaticMarkup(<Icons.info fill="white" />);
    return L.marker(latlng, {
      icon: DefaultMarker(icon, 1) as Icon,
    });
  };

  const onEachFeaturehandler = (
    feature: Feature,
    layer: Layer,
    type: string,
  ) => {
    const { properties } = feature;
    if (
      properties === null ||
      (!('attachments' in properties) &&
        !properties.name &&
        !properties.description)
    ) {
      return;
    }
    layer.bindPopup(
      renderToStaticMarkup(
        <Popup
          name={properties.name}
          description={properties.description}
          attachments={properties.attachments}
          type={type}
          id={properties.id}
        />,
      ),
      { offset: [4, -14] },
    );
  };

  return (
    <MapContainer
      className="h-full"
      {...container}
      scrollWheelZoom
      ref={setMap}
      // @ts-ignore type is wrong for this prop
      whenReady={handleReady}
    >
      <ResetViewControl
        title={t('resetView')}
        icon={renderToStaticMarkup(
          <div className="flex h-full items-center justify-center p-1">
            <Icons.crosshair {...propsForSVGPresentation} />
          </div>,
        )}
      />

      <LayersControl position="topright">
        {baseLayers.map(({ id, label, ...layer }, index) => (
          <LayersControl.BaseLayer key={id} checked={index === 0} name={label}>
            <TileLayer {...layer} />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>

      {layers?.map(layer => {
        if (layer.geojson === undefined || layer.defaultActive == false) {
          return null;
        }
        return (
          <GeoJSON
            key={layer.id}
            data={layer.geojson}
            style={layer.options.style}
            onEachFeature={(...args) =>
              onEachFeaturehandler(...args, layer.type)
            }
            pointToLayer={pointToLayerHandler}
          />
        );
      })}

      <ScaleControl />

      {pathName.startsWith('/map/observation') && <ObservationMarker />}
    </MapContainer>
  );
}
