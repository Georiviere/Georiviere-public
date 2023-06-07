'use client';

import Image from 'next/image';
import { useSettingsContext } from '@/context/settings';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons } from '../icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type Props = {
  className?: string;
};

export default function PartnerList({ className }: Props) {
  const t = useTranslations('site');
  const { settings } = useSettingsContext();
  if (settings === null) {
    return null;
  }

  const { footer: { partners = [] } = {} } = settings.customization;

  if (partners.length === 0) {
    return null;
  }
  return (
    <ul className={cn('item-center flex justify-center gap-4', className)}>
      {partners.map((item, index) => (
        <li key={index}>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a target="_blank" href={item.url} rel="noopener noreferrer">
                  <Image
                    loading="lazy"
                    className="h-12 w-auto sm:h-16"
                    src={item.src}
                    alt=""
                    width={300}
                    height={90}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent className="align-center flex gap-2">
                <Icons.externalLink role="img" aria-label={t('externalLink')} />
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
}
