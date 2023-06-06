'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostObservationProps } from '@/api/observations';
import { yupResolver } from '@hookform/resolvers/yup';
import convertToYup from 'json-schema-yup-transformer';
import {
  JSONSchema,
  JSONSchemaExtended,
} from 'json-schema-yup-transformer/dist/schema';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';

import { filesToBase64, getCorrespondingPath } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { Alert, AlertDescription, AlertTitle } from './alert/alert';
import ConditionalField from './conditional-field';
import { FormRowCoordinates } from './form-row-coordinates';
import { FormRowInput } from './form-row-input';
import { Icons, propsForSVGPresentation } from './icons';
import ObservationFormItem from './observation-form-item';

type Props = {
  jsonSchema: JSONSchema;
  handleSubmit: (body: PostObservationProps) => Promise<{
    error: boolean;
    message: string;
  }>;
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
  const [isLoading, setLoading] = useState(false);

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
      date_observation: new Date().toISOString().split('T')[0],
    },
  }) as InferType<typeof schema>;

  async function onSubmit(values: InferType<typeof schema>, event: Event) {
    const formData = new FormData(event.target as HTMLFormElement);

    const formDataFiles = [
      formData.get('file1'),
      formData.get('file2'),
      formData.get('file3'),
    ].filter(file => file !== null) as File[];

    const files = (await filesToBase64(formDataFiles)).filter(
      ({ file }) => file !== null,
    ) as { name: string; file: string }[];

    const { lng, lat, ...rest } = values;
    const data = {
      geom: `POINT(${lng} ${lat})`,
      properties: JSON.stringify({
        category: getCorrespondingPath(path),
        ...rest,
      }),
      files: JSON.stringify(files),
    };
    setLoading(true);
    const submit = await handleSubmit(data);
    setValidationMessage(submit);
    setLoading(false);
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

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        encType="multipart/form-data"
      >
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

        {Array.from({ length: 3 }, (_, index) => (
          <FormRowInput
            key={index}
            label={`${t('photoLabel')} ${index + 1}`}
            fieldProps={{
              name: `file${index + 1}`,
              accept: 'image/*',
              type: 'file',
            }}
          />
        ))}

        <p className="my-8 text-sm">{t('gdpr')}</p>

        <Button className="my-3 flex gap-2" type="submit">
          {isLoading && (
            <>
              <Icons.loading
                className="animate-spin"
                {...propsForSVGPresentation}
                height="20"
              />
              <span className="sr-only">{t('loading')}</span>
            </>
          )}{' '}
          <span>{t('submit')}</span>
        </Button>
      </form>
    </Form>
  );
}
