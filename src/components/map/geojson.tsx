import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layer } from '@/api/settings';
import { useMapContext } from '@/context/map';
import { Feature } from 'geojson';
import L, { Icon, LatLng, Layer as LeafletLayer } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { GeoJSON } from 'react-leaflet';

import { Icons } from '@/components/icons';
import { DefaultMarker } from '@/components/map/default-marker';
import Popup from '@/components/map/popup';

type Props = {
  layer: Layer;
};

export default function GeoJson({ layer }: Props) {
  const searchParams = useSearchParams();
  const { layers } = useMapContext();

  const onEachFeaturehandler = (
    feature: Feature,
    layer: LeafletLayer,
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

    if (properties.name) {
      layer.bindTooltip(properties.name);
    }

    if (layers === null || layers.length === 0) {
      return;
    }

    if ('url' in (layers.find(item => item.type === type) || {})) {
      layer.bindPopup(
        renderToStaticMarkup(
          <Popup
            name={properties.name}
            description={properties.description}
            attachments={properties.attachments}
            type={type}
            id={properties.id}
            params={searchParams}
          />,
        ),
        { offset: [4, -14] },
      );
    }
  };

  const pointToLayerHandler = (feature: Feature, latlng: LatLng) => {
    const icon =
      feature.properties?.type?.pictogram ??
      renderToStaticMarkup(<Icons.info fill="white" />);
    return L.marker(latlng, {
      icon: DefaultMarker(icon, 1) as Icon,
    });
  };

  const data = useMemo(() => {
    const searchText = searchParams.get('text');
    if (layer.geojson === undefined || layer.isActive == false) {
      return null;
    }
    if (!searchText || layer.geojson.type !== 'FeatureCollection') {
      return layer.geojson;
    }
    return {
      ...layer.geojson,
      features: layer.geojson.features.filter(feature =>
        feature.properties?.name?.includes(searchText),
      ),
    };
  }, [layer.geojson, layer.isActive, searchParams]);

  if (data === null) {
    return null;
  }

  return (
    <GeoJSON
      data={data}
      style={layer.options.style}
      onEachFeature={(...args) => onEachFeaturehandler(...args, layer.type)}
      pointToLayer={pointToLayerHandler}
    />
  );
}
