'use client';

import { ImgHTMLAttributes, useEffect, useId } from 'react';
import Image, { ImageProps } from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import useHasMounted from '@/hooks/useHasMounted';

import { Icons, propsForSVGPresentation } from './icons';

type Props = {
  images: ImgHTMLAttributes<HTMLImageElement>[];
  tiny?: boolean;
} & Partial<ImageProps>;

export default function Carousel({
  images,
  tiny = false,
  ...imageProps
}: Props) {
  const id = useId();
  const sliderClassName = id.replaceAll(':', '');
  const t = useTranslations('site');
  const isMounted = useHasMounted();

  useEffect(() => {
    if (images?.length > 1) {
      import('tiny-slider').then(({ tns }) => {
        tns({
          container: `.${sliderClassName}`,
          controlsContainer: `.${sliderClassName}-buttons`,
        });
      });
    }
  }, [images?.length, sliderClassName]);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1 || !isMounted) {
    // @ts-ignore `alt` attribute could not be defined
    return <Image alt="" {...images[0]} {...imageProps} />;
  }

  return (
    <div className="relative z-10">
      <div className={cn(sliderClassName, 'slider bg-secondary')}>
        {images.map((item, index) => (
          <div key={index}>
            {/* @ts-ignore `alt` attribute could not be defined */}
            <Image alt="" {...item} {...imageProps} />
          </div>
        ))}
      </div>
      <div
        className={cn(
          `${sliderClassName}-buttons`,
          'flex justify-between bg-secondary p-4',
        )}
      >
        <button className="group z-50 flex items-center gap-2 rounded-full bg-foreground/25 p-2 text-background transition-colors hover:bg-foreground/50 focus:bg-foreground/50">
          <Icons.chevronRight
            className="rotate-180"
            width={tiny ? 16 : 20}
            height={tiny ? 16 : 20}
            {...propsForSVGPresentation}
          />
          <span className={cn(tiny ? 'sr-only' : 'pr-4')}>{t('prev')}</span>
        </button>
        <button className="group flex items-center gap-2 rounded-full bg-foreground/25 p-2 text-background transition-colors hover:bg-foreground/50 focus:bg-foreground/50">
          <span className={cn(tiny ? 'sr-only' : 'pl-4')}>{t('next')}</span>
          <Icons.chevronRight
            width={tiny ? 16 : 20}
            height={tiny ? 16 : 20}
            {...propsForSVGPresentation}
          />
        </button>
      </div>
    </div>
  );
}
