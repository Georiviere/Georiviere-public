import { useTranslations } from 'next-intl';

import { Icons } from '@/components/icons';

export default function Loading() {
  const t = useTranslations();
  return (
    <Icons.loading
      className="size-8 m-auto animate-spin text-primary"
      role="img"
      aria-label={t('site.loading')}
    />
  );
}
