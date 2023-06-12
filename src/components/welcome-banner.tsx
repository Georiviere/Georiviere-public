'use client';

import Image from 'next/image';
import { useSettingsContext } from '@/context/settings';
import { useTranslations } from 'next-intl';

import { convertAttachementsToImages } from '@/lib/utils';

import Carousel from './carousel';

export default function WelcomeBanner() {
  const t = useTranslations('home');
  const { settings } = useSettingsContext();

  if (settings === null) {
    return null;
  }

  const {
    homepage: { welcomeBanner },
  } = settings.customization;

  if (welcomeBanner === undefined) {
    return null;
  }

  return (
    <div className="relative">
      {welcomeBanner.shouldDisplayText === true && (
        <h1 className="top absolute inset-2/4 z-20 w-full origin-top-left -translate-x-2/4 px-10 text-center text-lg font-bold text-white shadow lg:text-2xl">
          {t('title')}
        </h1>
      )}
      {welcomeBanner.images?.[0]?.url !== undefined && (
        <Carousel
          className="max-h-96 w-full object-cover object-center"
          height={580}
          priority
          images={convertAttachementsToImages(welcomeBanner.images)}
          width={1500}
        />
      )}
    </div>
  );
}
