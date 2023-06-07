'use client';

import Image from 'next/image';
import { useSettingsContext } from '@/context/settings';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default function Introduction({ className }: Props) {
  const { settings } = useSettingsContext();

  if (settings === null) {
    return null;
  }

  const { homepage } = settings.customization;

  if (homepage?.introduction === undefined) {
    return null;
  }
  const { title, content, images } = homepage.introduction;

  return (
    <section className={cn(className)}>
      {title && (
        <h2 className="my-8 text-2xl font-bold tracking-tight">{title}</h2>
      )}
      <div
        className={cn(
          'lg:grid ',
          images?.[0]?.url !== undefined && 'lg:grid-cols-3',
        )}
      >
        {images?.[0]?.url !== undefined && (
          <Image
            className="ratio-[3/4] mb-4 hidden self-end lg:block xl:translate-x-4"
            alt=""
            src={images[0].url}
            width={800}
            height={600}
          />
        )}
        {content && (
          <div
            className="col-span-2 bg-primary p-4 py-2 text-primary-foreground lg:py-0 xl:pl-10"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </section>
  );
}
