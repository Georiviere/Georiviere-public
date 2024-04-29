import { LatLngTuple } from 'leaflet';
import { useTranslations } from 'next-intl';

import ButtonCenterView from './button-center-view';
import ButtonClose from './button-close';

type Props = {
  content: {
    values: any[];
    contributedAt: string;
    id: string;
    label: string;
    description: string;
    customContributionTypes: number[];
    geometry: {
      coordinates: number[];
    };
  };
};

export default function ObservationDetailsPageUI({ content }: Props) {
  const t = useTranslations('observation');

  const date = new Date(content.contributedAt);

  return (
    <article>
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {t('title')} {content.id} - {content.label}
        </h1>
        <div className="absolute right-0 top-0 z-10 flex rounded-bl-lg border border-t-0 bg-background">
          {content.geometry && (
            <ButtonCenterView
              latLng={content.geometry.coordinates.reverse() as LatLngTuple}
            />
          )}
          <ButtonClose />
        </div>
      </header>

      <div className="mt-4">{content.description}</div>
      <div className="mt-4">
        <span className="text-sm font-medium leading-none">{`${t(
          'contributedAt',
        )}:`}</span>
        <span className="line-clamp-2 block text-sm leading-snug text-muted-foreground">
          {date.toLocaleString()}
        </span>
      </div>
      <ul className="mt-4">
        {content.values
          .filter(value => value.label)
          .map(value => (
            <li className="mt-2">
              <span className="text-sm font-medium leading-none">
                {value.label}:
              </span>
              <span className="line-clamp-2 block text-sm leading-snug text-muted-foreground">
                {value.value}
              </span>
            </li>
          ))}
      </ul>
    </article>
  );
}
