import { Layer } from '@/api/settings';
import { GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONOptions } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Popup as LeafletPopup,
  Marker,
  Polygon,
  Polyline,
  Tooltip,
} from 'react-leaflet';

import { Icons } from '@/components/icons';
import { DefaultMarker } from '@/components/map/default-marker';
import Popup from '@/components/map/popup';

type Props = {
  geometry: Geometry;
  properties: GeoJsonProperties;
  id: string;
  layer: Layer;
  options: GeoJSONOptions;
};

const MetaData = ({
  properties,
  layer,
}: {
  properties: GeoJsonProperties;
  layer: Layer;
}) => {
  if (properties === null || !properties.name) {
    return null;
  }
  return (
    <>
      <Tooltip>{properties.name}</Tooltip>
      {layer.type !== undefined && layer.url && (
        <LeafletPopup>
          <Popup
            name={properties.name}
            description={properties.description}
            attachments={properties.attachments}
            type={layer.type}
            id={properties.id}
          />
        </LeafletPopup>
      )}
    </>
  );
};

export const GeometryItem = ({
  geometry,
  properties,
  id,
  layer,
  options = { style: {} },
}: Props) => {
  if (geometry.type === 'GeometryCollection') {
    return (
      <>
        {geometry.geometries.map((geom, index) => (
          <GeometryItem
            key={`${id}-${index}`}
            id={`${id}-${index}`}
            geometry={geom}
            properties={{}}
            layer={layer}
            options={options}
          />
        ))}
      </>
    );
  }

  if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
    const coordinatesAsMultiPoint =
      geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiPoint.map((coordinates, index) => {
          const icon =
            properties?.type?.pictogram ??
            renderToStaticMarkup(<Icons.info fill="white" />);
          const [lat, lng] = coordinates;
          return (
            <Marker
              key={`point-${id}-${index}`}
              position={[lng, lat]}
              icon={DefaultMarker(icon, 1)}
            >
              <MetaData properties={properties} layer={layer} />
            </Marker>
          );
        })}
      </>
    );
  }

  if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
    const coordinatesAsMultiLineString =
      geometry.type === 'LineString'
        ? [geometry.coordinates]
        : geometry.coordinates;

    return (
      <>
        {coordinatesAsMultiLineString.map((group, index) => {
          return (
            <Polyline
              key={`linestring-${id}-${index}`}
              positions={group.map(([lat, lng]) => [lng, lat])}
              pathOptions={options.style as GeoJSONOptions}
            >
              <MetaData properties={properties} layer={layer} />
            </Polyline>
          );
        })}
      </>
    );
  }

  if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
    const coordinatesAsMultiPolygon =
      geometry.type === 'Polygon'
        ? [geometry.coordinates]
        : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiPolygon.map((group, index) => (
          <Polygon
            key={`polygon-${id}-${index}`}
            positions={group.map(line =>
              line.map<[number, number]>(([lat, lng]) => [lng, lat]),
            )}
            pathOptions={options.style as GeoJSONOptions}
          >
            <MetaData properties={properties} layer={layer} />
          </Polygon>
        ))}
      </>
    );
  }

  return null;
};
