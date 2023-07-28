import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layer } from '@/api/settings';

import { GeometryList } from '@/components/map/geometry-list';

type Props = {
  layer: Layer;
};

export default function GeoJson({ layer }: Props) {
  const searchParams = useSearchParams();

  const data = useMemo(() => {
    const searchText = searchParams.get('text');
    if (!layer.geojson || layer.isActive == false) {
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
    <GeometryList
      contents={data.features}
      layer={layer}
      options={layer.options}
    />
  );
}
