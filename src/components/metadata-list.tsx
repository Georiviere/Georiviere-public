import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Icon, Icons, propsForSVGPresentation } from '@/components/icons';

import MeterLength from './length';

export type MetadataListProps = {
  length?: number;
  descent?: number;
  flow?: string;
  type?: {
    label: string;
    category: {
      label: string;
    };
    pictogram?: string;
  };
  small?: boolean;
};

type MetadataItemProps = {
  show?: boolean;
  icon: Icon;
  type: string;
  value?: string | number;
  meters?: number;
  small?: boolean;
};

const MetadataItem = ({
  show,
  icon: Icon,
  type,
  value,
  meters,
  small,
}: MetadataItemProps) => {
  const t = useTranslations('details');
  if (!show) return null;

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-1">
      <dt>
        <Icon
          className="text-primary"
          {...propsForSVGPresentation}
          {...(small ? { width: 18, height: 18 } : {})}
        />
        <span className="sr-only">{t(type)}</span>
      </dt>
      <dd>{meters ? <MeterLength length={meters} /> : value}</dd>
    </div>
  );
};

export const MetadataList = ({
  length,
  descent,
  flow,
  type,
  small,
}: MetadataListProps) => {
  const t = useTranslations('details');
  return (
    <dl className="flex items-center justify-evenly gap-2 py-2">
      <MetadataItem
        show={length !== undefined}
        icon={Icons.chevronsLeftRight}
        type="length"
        meters={length}
        small={small}
      />
      <MetadataItem
        show={descent !== undefined}
        icon={Icons.arrowDownRight}
        type="descent"
        meters={descent}
        small={small}
      />
      <MetadataItem
        show={!!flow}
        icon={Icons.waves}
        type="flow"
        value={flow}
        small={small}
      />
      {type && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-1">
          <dt>{type.category.label} :</dt>
          <dd>
            <Badge className="gap-2">
              {type.pictogram && (
                <Image
                  loading="lazy"
                  src={type.pictogram}
                  width={24}
                  height={24}
                  alt=""
                />
              )}
              <span>{type.label}</span>
            </Badge>
          </dd>
        </div>
      )}
    </dl>
  );
};
