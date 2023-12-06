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

export default function DetailsPageUI({ content }: Props) {
  const t = useTranslations('details');
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
        <div className="absolute right-0 top-0 flex rounded-bl-lg border border-t-0 bg-background">
          {content.geometryCenter && (
            <ButtonCenterView
              latLng={
                content.geometryCenter.coordinates.reverse() as LatLngTuple
              }
            />
          )}
          <ButtonClose />
        </div>
        <dl className="flex items-center gap-2 py-2">
          {content.length !== undefined && (
            <>
              <dt>
                <Icons.chevronsLeftRight
                  className="text-primary"
                  {...propsForSVGPresentation}
                />
                <span className="sr-only">{t('length')}</span>
              </dt>
              <dd className="mr-2">
                <MeterLength length={content.length} />
              </dd>
            </>
          )}
          {content.descent !== undefined && (
            <>
              <dt>
                <Icons.arrowDownRight
                  className="text-primary"
                  {...propsForSVGPresentation}
                />
                <span className="sr-only">{t('descent')}</span>
              </dt>
              <dd className="mr-2">
                <MeterLength length={content.descent} />
              </dd>
            </>
          )}
          {content.flow && (
            <>
              <dt>
                <Icons.waves
                  className="text-primary"
                  {...propsForSVGPresentation}
                />
                <span className="sr-only">{t('flow')}</span>
              </dt>
              <dd className="mr-2">{content.flow}</dd>
            </>
          )}
          {content.type && (
            <>
              <dt>{content.type.category.label} :</dt>
              <dd>
                <Badge className="gap-2">
                  {content.type.pictogram && (
                    <Image
                      loading="lazy"
                      src={content.type.pictogram}
                      width={24}
                      height={24}
                      alt=""
                    />
                  )}
                  <span>{content.type.label}</span>
                </Badge>
              </dd>
            </>
          )}
        </dl>
      </header>

      <div dangerouslySetInnerHTML={{ __html: content.description }} />
    </article>
  );
}
