import { Layer } from '@/api/settings';
import { GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONOptions } from 'leaflet';

import { GeometryItem } from '@/components/map/geometry-item';

export type PropsType = {
  contents?: {
    geometry: Geometry;
    properties: GeoJsonProperties;
  }[];
  layer: Layer;
  options: GeoJSONOptions;
};

export const GeometryList = ({ contents, ...props }: PropsType) => {
  if (contents === undefined) {
    return null;
  }

  return (
    <>
      {contents.map((contentProps, index) => (
        <GeometryItem
          key={index}
          id={String(index)}
          {...contentProps}
          {...props}
        />
      ))}
    </>
  );
};
