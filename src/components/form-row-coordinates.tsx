'use client';

import { useCallback, useEffect, useId, useRef } from 'react';
import { useMapContext } from '@/context/map';

import { cn } from '@/lib/utils';

import { Input, InputProps } from './ui/input';
import { Label } from './ui/label';

type Props = {
  className?: string;
  fieldProps?: InputProps;
  helpText?: string;
  label?: string;
};

export function FormRowCoordinates({ className, fieldProps, ...props }: Props) {
  const longitudeId = useId();
  const latitudeId = useId();
  const helpTextId = useId();

  const { observationCoordinates, setObservationCoordinates } = useMapContext();

  const longitudeEl = useRef<HTMLInputElement>(null);
  const latitudeEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (observationCoordinates) {
      const {
        coordinates: [lng, lat],
      } = observationCoordinates;
      if (longitudeEl.current !== null) {
        longitudeEl.current.value = lng.toString();
      }
      if (latitudeEl.current !== null) {
        latitudeEl.current.value = lat.toString();
      }
    }
  }, [observationCoordinates]);

  const handleChange = useCallback(() => {
    setObservationCoordinates({
      type: 'Point',
      coordinates: [
        Number(longitudeEl.current?.value),
        Number(latitudeEl.current?.value),
      ],
    });
  }, [setObservationCoordinates]);

  return (
    <div
      className={cn(
        'my-6 grid w-full grid-cols-2 items-center gap-1.5',
        className,
      )}
      {...props}
    >
      <div>
        <Label htmlFor={longitudeId}>Longitude</Label>
        <Input
          aria-describedby={helpTextId}
          className="bg-input"
          id={longitudeId}
          max="180"
          min="-180"
          name="longitude"
          onChange={handleChange}
          ref={longitudeEl}
          required
          step="0.00001"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor={latitudeId}>Latitude</Label>
        <Input
          aria-describedby={helpTextId}
          className="bg-input"
          id={latitudeId}
          max="90"
          min="-90"
          name="latitude"
          onChange={handleChange}
          ref={latitudeEl}
          step="0.00001"
          type="number"
        />
      </div>
      <p id={helpTextId} className="col-span-2 text-sm text-muted-foreground">
        Indiquez la position de l&apos;observation sur la carte
      </p>
    </div>
  );
}
