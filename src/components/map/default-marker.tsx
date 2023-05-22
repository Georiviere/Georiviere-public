import Image from 'next/image';
import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from '../icons';

const markerHeight = 44;
const markerWidth = 36;

const getWidth = (ratio: number) => {
  if (ratio === 1.5) {
    return '!w-7';
  }
  if (ratio === 2) {
    return '!w-10';
  }
  return '!w-5';
};

const getTop = (ratio: number) => {
  if (ratio === 1.5) {
    return 'top-4';
  }
  if (ratio === 2) {
    return 'top-4';
  }
  return 'top-2';
};

const UIMarker: React.FC<{
  icon?: string;
  zoomRatio: number;
  className: string;
}> = ({ icon, zoomRatio, ...props }) => {
  const iconSrc = icon?.[0] === '<' ? `data:image/svg+xml;utf8,${icon}` : icon;

  const width = getWidth(zoomRatio);
  const top = getTop(zoomRatio);
  return (
    <div className="relative flex justify-center">
      <Icons.mapMarker
        width={markerWidth * zoomRatio}
        height={markerHeight * zoomRatio}
        {...propsForSVGPresentation}
        {...props}
      />
      {iconSrc && (
        <Image
          alt=""
          className={`absolute z-[500] ${width} ${top}`}
          loading="lazy"
          src={iconSrc}
          width={20 * zoomRatio}
          height={20 * zoomRatio}
        />
      )}
    </div>
  );
};

export const DefaultMarker = (
  icon?: string,
  zoomRatio = 1,
  className?: string,
): DivIcon =>
  new DivIcon({
    iconSize: [markerHeight * zoomRatio, markerWidth * zoomRatio],
    // point of the icon which will correspond to marker's location
    iconAnchor: [(markerWidth * zoomRatio) / 2, markerHeight * zoomRatio], // horizontal middle of the icon and bottom of it
    html: renderToStaticMarkup(
      <UIMarker
        icon={icon}
        zoomRatio={zoomRatio}
        className={cn('text-primary', className)}
      />,
    ),
    className: 'bg-none border-none',
  });
