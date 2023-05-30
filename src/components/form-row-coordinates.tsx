'use client';

import { useEffect } from 'react';
import { useMapContext } from '@/context/map';
import {
  JSONSchema,
  JSONSchemaExtended,
} from 'json-schema-yup-transformer/dist/schema';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form/dist/types/form';

import { cn } from '@/lib/utils';

import ObservationFormItem from './observation-form-item';

type Props = {
  className?: string;
  form: UseFormReturn;
  label?: string;
  lngLat: JSONSchema;
};

export function FormRowCoordinates({
  className,
  lngLat,
  form,
  ...props
}: Props) {
  const { observationCoordinates } = useMapContext();
  const t = useTranslations('observation');

  useEffect(() => {
    if (observationCoordinates) {
      const {
        coordinates: [lng, lat],
      } = observationCoordinates;
      form.setValue('lat', lat, { shouldTouch: true });
      form.setValue('lng', lng, { shouldTouch: true });
      form.trigger('lat');
      form.trigger('lng');
    }
  }, [form, observationCoordinates]);

  return (
    <div
      className={cn(
        'items-top my-6 grid w-full grid-cols-2 gap-1.5',
        className,
      )}
      {...props}
    >
      {Object.entries(lngLat as JSONSchemaExtended).map(([name, props]) => (
        <ObservationFormItem
          key={name}
          form={form}
          name={name}
          label={props.title}
          list={props.enum}
          format={props.format}
          description={props.description}
          fieldsProps={{
            step: '0.00001',
            readOnly: true,
          }}
        />
      ))}
      <p className="col-span-2 text-sm text-muted-foreground">
        {t('coordinatesHelptext')}
      </p>
    </div>
  );
}
