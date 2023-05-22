import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Marker as LMarker, LatLngLiteral } from 'leaflet';
import { Marker } from 'react-leaflet';

export type Props = {
  onChange?: (latLng: LatLngLiteral) => void;
  position: LatLngLiteral;
  icon?: Icon;
};
export const DraggableMarker: React.FC<Props> = ({
  onChange,
  position,
  icon,
}) => {
  const [currentPosition, setPosition] = useState<LatLngLiteral>(position);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  const markerRef = useRef<LMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          const latLng = marker.getLatLng();
          setPosition(latLng);
          onChange?.(latLng);
        }
      },
    }),
    [onChange],
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      icon={icon}
      position={currentPosition}
      ref={markerRef}
    />
  );
};
