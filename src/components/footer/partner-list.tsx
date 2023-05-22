import Image from 'next/image';
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

const partnerList = [
  {
    src: 'https://randonature.parc-haut-jura.fr/medias/logos/logo_pnrhj_dark.png',
    label: 'Parc naturel régional du Haut-Jura',
    href: 'http://parc-haut-jura.fr/',
  },
  {
    src: 'https://randonature.parc-haut-jura.fr/medias/logos/logo_gtj_dark.png',
    label: 'Grandes traversées du Haut-Jura',
    href: 'https://www.gtj.asso.fr/',
  },
  {
    src: 'https://randonature.parc-haut-jura.fr/medias/logos/logo_region_aura_dark.png',
    label: 'La Région Auvergne-Rhône-Alpes',
    href: 'https://www.montagnes-du-jura.fr/',
  },
];

export default function PartnerList({ className }: Props) {
  const t = useTranslations('site');
  if (partnerList.length === 0) {
    return null;
  }
  return (
    <ul className={cn('item-center flex justify-center gap-4', className)}>
      {partnerList.map(item => (
        <li>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a target="_blank" href={item.href} rel="noopener noreferrer">
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
