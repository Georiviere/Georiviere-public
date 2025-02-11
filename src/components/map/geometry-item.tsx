import { Fragment } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layer } from '@/api/settings';
import { GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONOptions, PathOptions } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Polygon, Polyline } from 'react-leaflet';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { DefaultMarker } from '@/components/map/default-marker';

import { GeometryTooltip } from './geometry-tooltip';

type Props = {
  geometry: Geometry;
  properties: GeoJsonProperties;
  id: string;
  layer: Layer;
  options: GeoJSONOptions;
};

export const GeometryItem = ({
  geometry,
  properties,
  id,
  layer,
  options = { style: {} },
}: Props) => {
  const params = useSearchParams();
  const router = useRouter();
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

  const hasDetails = layer.type !== undefined && layer.url && properties?.id;

  const featureEventHandler = {
    ...(hasDetails && {
      click: () => {
        router.push(
          `/map/${layer?.type}/${properties?.id}?${params.toString()}`,
        );
      },
    }),
    ...(layer.type === 'contributions' && {
      click: () => {
        router.push(`/map/observation/damages/details/${id}`);
      },
    }),
  };

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
              eventHandlers={featureEventHandler}
            >
              <GeometryTooltip properties={properties} layer={layer} />
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
          if (layer.type === 'streams') {
            return (
              <Fragment key={`linestring-${id}-${index}`}>
                <Polyline
                  positions={group.map(([lat, lng]) => [lng, lat])}
                  pathOptions={options.style as GeoJSONOptions}
                  className={layer.type}
                ></Polyline>
                {/* Duplicate streams layer to animate it */}
                <Polyline
                  positions={group.map(([lat, lng]) => [lng, lat])}
                  pathOptions={options.style as GeoJSONOptions}
                  className="streams-animation"
                ></Polyline>
                {/* Add an invisible stream to have a click buffer */}
                <Polyline
                  positions={group.map(([lat, lng]) => [lng, lat])}
                  pathOptions={{
                    weight: 10,
                    opacity: 0,
                  }}
                  eventHandlers={{
                    mouseover: e => e.target.setStyle({ opacity: 0.5 }),
                    mouseout: e => e.target.setStyle({ opacity: 0 }),
                    ...featureEventHandler,
                  }}
                  className={cn(
                    'streams-hover',
                    !hasDetails && '!cursor-[unset]',
                  )}
                >
                  <GeometryTooltip properties={properties} layer={layer} />
                </Polyline>
              </Fragment>
            );
          }
          return (
            <Polyline
              positions={group.map(([lat, lng]) => [lng, lat])}
              pathOptions={options.style as GeoJSONOptions}
              className={cn(layer.type, !hasDetails && '!cursor-[unset]')}
              eventHandlers={featureEventHandler}
            >
              <GeometryTooltip properties={properties} layer={layer} />
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
            eventHandlers={{
              mouseover: e => e.target.setStyle({ fillOpacity: 0.8 }),
              mouseout: e =>
                e.target.setStyle({
                  fillOpacity:
                    (options.style as PathOptions)?.fillOpacity ?? 0.2,
                }),
              ...featureEventHandler,
            }}
            className={cn(
              'transition-[fill-opacity]',
              !hasDetails && '!cursor-[unset]',
            )}
            pane="tilePane"
          >
            <GeometryTooltip properties={properties} layer={layer} />
          </Polygon>
        ))}
      </>
    );
  }

  return null;
};
