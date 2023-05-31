import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {t('site.notFound')}
        </h1>
      </div>
      <p className="py-8">{t('site.notFound-content')}</p>
    </div>
  );
}
