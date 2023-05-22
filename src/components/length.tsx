import { useTranslations } from 'next-intl';

type Props = {
  length: number;
};

export default function MeterLength({ length }: Props) {
  const t = useTranslations('details');
  if (length > 999) {
    return (
      <>
        {(length / 1000).toFixed(1)}
        <abbr title={t('kilometers')}>{t('km')}</abbr>
      </>
    );
  }
  return (
    <>
      {length.toFixed(0)}
      <abbr title={t('meters')}>{t('m')}</abbr>
    </>
  );
}
