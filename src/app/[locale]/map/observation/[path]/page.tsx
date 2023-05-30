import {
  getObservationJsonSchema,
  handleSubmitObservation,
} from '@/api/observations';
import { JSONSchema } from 'json-schema-yup-transformer/dist/schema';
import { getTranslations } from 'next-intl/server';

import ButtonClose from '@/components/button-close';
import ObservationForm from '@/components/observation-form';

type Props = {
  params: {
    path: string;
  };
};

export default async function ObservationPage({ params: { path } }: Props) {
  const t = await getTranslations('observation');
  const jsonSchema = (await getObservationJsonSchema(path)) as JSONSchema;

  return (
    <section className="px-2">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          {t(`${path}.label`)}
        </h1>
        <div className="absolute right-0 top-0 flex rounded-bl-lg border border-t-0 bg-background">
          <ButtonClose label={t('cancel')} />
        </div>
      </header>

      <p className="py-8">{t(`${path}.description`)}</p>

      <ObservationForm
        jsonSchema={jsonSchema}
        handleSubmit={handleSubmitObservation}
      />
    </section>
  );
}
