import Image from 'next/image';
import { Point } from 'geojson';
import { LatLngTuple } from 'leaflet';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Icons, propsForSVGPresentation } from '@/components/icons';

import ButtonCenterView from './button-center-view';
import ButtonClose from './button-close';
import MeterLength from './length';

type Props = {
  content: {
    attachments: {
      url: string;
    }[];
    description: string;
    name: string;
    length?: number;
    descent?: number;
    flow?: string;
    geometry_center?: {
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
      {content.attachments[0]?.url && (
        <div className="-m-8 mb-6">
          <Image
            src={content.attachments[0]?.url}
            width={800}
            height={600}
            alt=""
          />
        </div>
      )}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {content.name}
        </h1>
        <div className="absolute right-0 top-0 flex rounded-bl-lg border border-t-0 bg-background">
          {content.geometry_center && (
            <ButtonCenterView
              latLng={
                content.geometry_center.coordinates.reverse() as LatLngTuple
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

      {content.description.split('\r\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string, index: number) => {
          return (
            <p key={index} className="py-4">
              {line}
            </p>
          );
        })}
    </article>
  );
}
