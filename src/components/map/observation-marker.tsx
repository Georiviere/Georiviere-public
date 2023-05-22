'use client';

import React, { useEffect } from 'react';
import { useMapContext } from '@/context/map';
import { Icon, LatLngLiteral } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useMapEvents } from 'react-leaflet';

import { Icons } from '../icons';
import { DefaultMarker } from './default-marker';
import { DraggableMarker } from './draggable-marker';

export const ObservationMarker: React.FC = () => {
  const { observationCoordinates, setObservationCoordinates } = useMapContext();

  const icon = DefaultMarker(
    renderToStaticMarkup(<Icons.eye fill="white" />),
    1.5,
  ) as Icon;

  useMapEvents({
    click: ({ latlng }: { latlng: LatLngLiteral }) => {
      handleChange(latlng);
    },
  });

  const handleChange = (latLng: LatLngLiteral) => {
    setObservationCoordinates({
      type: 'Point',
      coordinates: [
        Number(latLng.lng.toFixed(5)),
        Number(latLng.lat.toFixed(5)),
      ],
    });
  };

  if (observationCoordinates === null) {
    return null;
  }

  const {
    coordinates: [lng, lat],
  } = observationCoordinates;

  return (
    <DraggableMarker
      onChange={handleChange}
      position={{
        lat,
        lng,
      }}
      icon={icon}
    />
  );
};
