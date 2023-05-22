'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getObservationJsonSchema } from '@/api/observations';
import { yupResolver } from '@hookform/resolvers/yup';
import convertToYup from 'json-schema-yup-transformer';
import {
  JSONSchema,
  JSONSchemaExtended,
} from 'json-schema-yup-transformer/dist/schema';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import ConditionalField from './conditional-field';
import ObservationFormItem from './observation-form-item';

export default function ObservationForm() {
  const t = useTranslations('observation');
  const { path } = useParams();
  const jsonSchema = getObservationJsonSchema(path) as JSONSchema;

  const { allOf, ...schema } = jsonSchema;
  const [conditionalFieldToDisplay, setConditionalFieldToDisplay] = useState<
    null | string
  >(null);

  const form = useForm({
    resolver: yupResolver(convertToYup(schema) as InferType<typeof schema>),
    defaultValues: {
      name_author: '',
      first_name_author: '',
      email_author: 'mail@mail.mail',
      description: '',
      type: '',
      date_observation: new Date().toISOString().split('.')[0],
    },
  });

  function onSubmit(values: InferType<typeof schema>) {
    // TODO POST
    console.log(values);
  }

  const watchType = form.watch('type');
  const conditionalFields = useMemo(
    () => allOf?.map((item: JSONSchema) => item?.then.properties) ?? [],
    [allOf],
  );

  useEffect(() => {
    const matchedType = allOf?.find(
      (item: JSONSchema) => item?.if.properties.type.const === watchType,
    );
    if (matchedType === undefined) {
      setConditionalFieldToDisplay(null);
    } else {
      const [matchedField] = Object.keys(matchedType.then.properties);
      setConditionalFieldToDisplay(matchedField);
    }
  }, [allOf, conditionalFields, watchType]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.entries(jsonSchema.properties as JSONSchemaExtended).map(
          ([name, properties]) => (
            <ObservationFormItem
              key={name}
              control={form.control}
              name={name}
              label={properties.title}
              list={properties.enum}
              format={properties.format}
              description={properties.description}
            />
          ),
        )}

        {conditionalFields
          .flatMap(Object.entries)
          .map(([name, properties]: [string, JSONSchema]) => {
            if (conditionalFieldToDisplay !== name) {
              return null;
            }
            console.log(conditionalFields);
            return (
              <ConditionalField
                key={name}
                control={form.control}
                name={name}
                label={properties.title}
                list={properties.enum}
                format={properties.format}
                description={properties.description}
              />
            );
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
