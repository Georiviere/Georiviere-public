import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Icons, propsForSVGPresentation } from '@/components/icons';

export default function NotFound() {
  // TODO: next-intl should support soon translations for statics pages
  // const t = useTranslations();
  const t = (text: string) => {
    if (text === 'details.closePage') {
      return "Fermer la page";
    }
    if (text === 'site.notFound') {
      return 'Page non trouvée';
    }
    if (text === 'site.notFound-content') {
      return "Cette page n'existe pas ou plus.";
    }
  };
  return (
    <article>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
            {t('site.notFound')}
          </h1>
          <Link className="flex" href="/map">
            <Icons.close {...propsForSVGPresentation} />{' '}
            <span>{t('details.closePage')}</span>
          </Link>
        </div>
      </header>
      <p className="py-8">{t('site.notFound-content')}</p>
    </article>
  );
}
