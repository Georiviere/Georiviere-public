'use client';

import { useMapContext } from '@/context/map';
import { LatLngTuple } from 'leaflet';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

type Props = {
  className?: string;
  label?: string;
  latLng: LatLngTuple;
};

export default function ButtonCenterView({ className, label, latLng }: Props) {
  const { map } = useMapContext();
  const t = useTranslations('map');
  const setView = () => {
    map?.setView(latLng);
  };
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={cn('h-7 rounded-none p-2', className)}
            onClick={setView}
          >
            <Icons.crosshair {...propsForSVGPresentation} height={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          {label ?? t('centerOnMap')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
