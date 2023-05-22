'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import ButtonClose from '@/components/button-close';
import ObservationForm from '@/components/observation-form';

export default function ObservationPage() {
  const { path } = useParams();
  const t = useTranslations('observation');

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

      <ObservationForm />
    </section>
  );
}
