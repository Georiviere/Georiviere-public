'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from './icons';
import LinkAsButton from './ui/link-as-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

type Props = {
  className?: string;
  href?: string;
  label?: string;
};

export default function ButtonClose({ className, label, href }: Props) {
  const t = useTranslations('details');
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <LinkAsButton
            size="sm"
            variant="ghost"
            href={href ?? '/map'}
            className={cn('h-7 rounded-none p-2', className)}
          >
            <Icons.close {...propsForSVGPresentation} height={20} />
          </LinkAsButton>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          {label ?? t('closePage')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
