'use client';

import { useEffect } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { useMapContext } from '@/context/map';
import L, { LeafletEvent } from 'leaflet';
import { useTranslations } from 'next-intl';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from 'react-leaflet';

import { Icons, propsForSVGPresentation } from '@/components/icons';
import GeoJson from '@/components/map/geojson';
import { ObservationMarker } from '@/components/map/observation-marker';

import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import SearchMapBadge from './search-map-badge';

export default function SearchMap() {
  const params = useParams();
  const searchParams = useSearchParams();
  useEffect(() => {
    // We must fire a resize event for leaflet which can not calculate the width of the available space
    window.dispatchEvent(new Event('resize'));
  }, [params, searchParams]);

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
        position: 'topleft',
      })
      .addTo(event.target);
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

      <SearchMapBadge />

      {layers?.map((layer, index) => (
        <GeoJson
          key={`layer-${index}-${searchParams.toString()}`}
          layer={layer}
        />
      ))}

      <ScaleControl />

      {pathName.startsWith('/map/observation') && <ObservationMarker />}
    </MapContainer>
  );
}
