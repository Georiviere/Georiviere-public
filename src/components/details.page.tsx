import Image from 'next/image';
import { Attachement } from '@/api/settings';
import { LatLngTuple } from 'leaflet';
import { useTranslations } from 'next-intl';

import { convertAttachementsToImages } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Icons, propsForSVGPresentation } from '@/components/icons';

import ButtonCenterView from './button-center-view';
import ButtonClose from './button-close';
import Carousel from './carousel';
import MeterLength from './length';

type Props = {
  content: {
    attachments: Attachement[];
    description: string;
    name: string;
    length?: number;
    descent?: number;
    flow?: string;
    geometryCenter?: {
      type: 'Point';
      coordinates: [number, number];
    };
    type?: {
      label: string;
      category: {
        label: string;
      };
      pictogram?: string;
    };
  };
};

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
};

export const MetadataList = ({
  length,
  descent,
  flow,
  type,
}: MetadataListProps) => {
  const t = useTranslations('details');
  return (
    <dl className="flex items-center gap-2 py-2">
      {length !== undefined && (
        <>
          <dt>
            <Icons.chevronsLeftRight
              className="text-primary"
              {...propsForSVGPresentation}
            />
            <span className="sr-only">{t('length')}</span>
          </dt>
          <dd className="mr-2">
            <MeterLength length={length} />
          </dd>
        </>
      )}
      {descent !== undefined && (
        <>
          <dt>
            <Icons.arrowDownRight
              className="text-primary"
              {...propsForSVGPresentation}
            />
            <span className="sr-only">{t('descent')}</span>
          </dt>
          <dd className="mr-2">
            <MeterLength length={descent} />
          </dd>
        </>
      )}
      {flow && (
        <>
          <dt>
            <Icons.waves
              className="text-primary"
              {...propsForSVGPresentation}
            />
            <span className="sr-only">{t('flow')}</span>
          </dt>
          <dd className="mr-2">{flow}</dd>
        </>
      )}
      {type && (
        <>
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
        </>
      )}
    </dl>
  );
};

export default function DetailsPageUI({ content }: Props) {
  return (
    <article>
      {content.attachments.length > 0 && (
        <div className="-m-8 mb-6">
          <Carousel
            className="min-w-full"
            images={convertAttachementsToImages(content.attachments)}
            width={800}
            height={600}
          />
        </div>
      )}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {content.name}
        </h1>
        <div className="absolute right-0 top-0 z-10 flex rounded-bl-lg border border-t-0 bg-background">
          {content.geometryCenter && (
            <ButtonCenterView
              latLng={
                content.geometryCenter.coordinates.reverse() as LatLngTuple
              }
            />
          )}
          <ButtonClose />
        </div>
        <MetadataList
          length={content.length}
          descent={content.descent}
          flow={content.flow}
          type={content.type}
        />
      </header>

      <div dangerouslySetInnerHTML={{ __html: content.description }} />
    </article>
  );
}
