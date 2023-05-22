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

const links = [
  {
    label: 'Mentions légal',
    url: '#',
  },
  {
    label: 'Georivière',
    url: 'https://georiviere.fr/',
  },
];

const socialNetworks = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/PNRHJ/',
    icon: '/medias/facebook.svg',
  },
  {
    label: 'Youtube',
    url: 'https://www.youtube.com/channel/UC5UbalFTYO8BlYRa9qbZmaQ/',
    icon: '/medias/youtube.svg',
  },
];

export default function Links({ className }: Props) {
  const t = useTranslations('site');
  if (links.length === 0 && socialNetworks.length === 0) {
    return null;
  }
  return (
    <div
      className={cn(
        'mt-8 flex flex-col justify-between text-center sm:mt-0 sm:text-right',
        className,
      )}
    >
      {links.length > 0 && (
        <ul className="mb-3 flex justify-center gap-3 sm:block">
          {links.map(item => (
            <li key={item.url}>
              <a
                className="group flex items-center justify-center gap-2 hover:underline focus:underline sm:justify-end"
                href={item.url}
                rel="nofollow noreferrer"
              >
                <Icons.externalLink
                  className="group-hover:block group-focus:block sm:hidden"
                  role="img"
                  aria-label={t('externalLink')}
                />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {socialNetworks.length > 0 && (
        <div>
          <h3 className="mb-2">{t('followUs')}</h3>
          <ul className="flex justify-center gap-3 sm:justify-end">
            {socialNetworks.map(item => (
              <li key={item.url}>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={item.url}
                        rel="nofollow noreferrer"
                        target="_blank"
                      >
                        <Image
                          loading="lazy"
                          alt=""
                          height={24}
                          src={item.icon}
                          width={24}
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="align-center flex gap-2">
                      <Icons.externalLink
                        role="img"
                        aria-label={t('externalLink')}
                      />
                      {t('ourPage')} {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
