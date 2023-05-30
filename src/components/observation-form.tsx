'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import convertToYup from 'json-schema-yup-transformer';
import {
  JSONSchema,
  JSONSchemaExtended,
} from 'json-schema-yup-transformer/dist/schema';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';

import { getCorrespondingPath } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { Alert, AlertDescription, AlertTitle } from './alert/alert';
import ConditionalField from './conditional-field';
import { FormRowCoordinates } from './form-row-coordinates';
import { Icons } from './icons';
import ObservationFormItem from './observation-form-item';

type Props = {
  jsonSchema: JSONSchema;
  handleSubmit: any;
};

type Message = {
  error: boolean;
  message: string;
};

export default function ObservationForm({ jsonSchema, handleSubmit }: Props) {
  const { path } = useParams();
  const t = useTranslations('observation');

  const [validationMessage, setValidationMessage] = useState<null | Message>(
    null,
  );

  const { allOf, ...schema } = jsonSchema;
  const [conditionalFieldsToDisplay, setConditionalFieldsToDisplay] = useState<
    null | string[]
  >(null);

  const config = {
    errors: {
      defaults: {
        required: t('error.required'),
        enum: t('error.required'),
      },
    },
  };

  const form = useForm({
    resolver: yupResolver(
      convertToYup(schema, config) as InferType<typeof schema>,
    ),
    defaultValues: {
      type: '',
      date_observation: new Date().toISOString().split('.')[0],
    },
  }) as InferType<typeof schema>;

  async function onSubmit(values: InferType<typeof schema>) {
    // TODO POST
    const { lng, lat, ...rest } = values;
    const body = {
      geom: `POINT(${lng} ${lat})`,
      properties: {
        category: getCorrespondingPath(path),
        ...rest,
      },
    };
    const submit = await handleSubmit(body);
    setValidationMessage(submit);
  }

  const watchType = form.watch('type');
  const conditionalFields = useMemo(
    () => allOf?.map((item: JSONSchema) => item?.then.properties) ?? [],
    [allOf],
  );

  useEffect(() => {
    const matchedType = allOf?.find(
      (item: JSONSchema) => item?.if.properties.type?.const === watchType,
    );
    if (matchedType === undefined) {
      setConditionalFieldsToDisplay(null);
    } else {
      const matchedFields = Object.keys(matchedType.then.properties);
      setConditionalFieldsToDisplay(matchedFields);
    }
  }, [allOf, conditionalFields, watchType]);

  const {
    properties: { lng, lat, ...properties },
  } = jsonSchema;

  if (validationMessage?.error === false) {
    return (
      <Alert variant="default">
        <Icons.check className="h-4 w-4" />
        <AlertTitle className="ml-6">{t('validation.title')}</AlertTitle>
        <AlertDescription>{t('validation.content')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      {validationMessage?.error && (
        <Alert variant="destructive">
          <Icons.alert className="h-4 w-4" />
          <AlertTitle className="ml-6">{t('error.title')}</AlertTitle>
          <AlertDescription>{validationMessage.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {lng && lat && <FormRowCoordinates lngLat={{ lng, lat }} form={form} />}

        {Object.entries(properties as JSONSchemaExtended).map(
          ([name, props]) => (
            <ObservationFormItem
              key={name}
              form={form}
              name={name}
              label={props.title}
              list={props.enum}
              format={props.format}
              description={props.description}
            />
          ),
        )}

        {conditionalFields
          .flatMap(Object.entries)
          .map(([name, props]: [string, JSONSchema]) => {
            return conditionalFieldsToDisplay?.map(item => {
              if (item !== name) {
                return null;
              }

              return (
                <ConditionalField
                  key={name}
                  form={form}
                  name={name}
                  label={props.title}
                  list={props.enum}
                  format={props.format}
                  description={props.description}
                  properties={props}
                />
              );
            });
          })}

        <p className="my-8 text-sm">
          Texte RGPD consectetur adipiscing elit. In vitae elit a lorem tempus
          consequat. Mauris ultrices non risus vitae facilisis. Sed iaculis
          augue mi, sit amet hendrerit nunc vestibulum non. Nulla facilisi.
          Fusce placerat lectus non dui lacinia, in pellentesque eros bibendum.
        </p>

        <Button className="my-3" type="submit">
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
}
