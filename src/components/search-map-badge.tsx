import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from './icons';
import { Badge } from './ui/badge';

type Props = {
  className?: string;
};

export default function SearchMapBadge({ className }: Props) {
  const searchParams = useSearchParams();
  const text = searchParams.get('text');
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('map');

  if (!text) {
    return null;
  }

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('text');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Badge
      className={cn(
        'absolute left-1/2 top-4 z-[400] -translate-x-1/2 items-center text-sm',
        className,
      )}
    >
      <span>&ldquo;{text}&ldquo;</span>
      <button
        className="ml-1 flex items-center"
        type="button"
        onClick={handleClick}
      >
        <Icons.close width={16} height={16} {...propsForSVGPresentation} />
        <span className="sr-only">{t('deleteFilterText')}</span>
      </button>
    </Badge>
  );
}
