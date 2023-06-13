import { getTranslations } from 'next-intl/server';

import SiteFooter from '@/components/site-footer';

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <>
      <main role="main" className="grow">
        <div className="container pb-8 pt-6 md:py-10">
          <header>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                {t('site.notFound')}
              </h1>
            </div>
          </header>
          <p className="py-8">{t('site.notFound-content')}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
