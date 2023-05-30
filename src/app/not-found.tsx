import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  // TODO: next-intl should support soon translation for statics pages
  // const t = useTranslations('site');
  const t = (text: string) => {
    if (text === 'title') {
      return 'Georivière';
    }
    if (text === 'notFound') {
      return 'Page non trouvée';
    }
  };
  return (
    <div>
      <h2>
        <Link href="/">{t('title')}</Link>
      </h2>
      <p>{t('notFound')}</p>
    </div>
  );
}
