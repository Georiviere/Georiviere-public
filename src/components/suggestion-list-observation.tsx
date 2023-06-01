import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from './ui/card';

type Props = {
  className?: string;
};

export default function SuggestionListObservation({ className }: Props) {
  const t = useTranslations('observation');
  const items = [
    {
      label: t('damages.label'),
      description: t('damages.description'),
      name: 'damages',
      image: '/medias/placeholder0.jpg',
    },
    {
      label: t('fauna-flora.label'),
      description: t('fauna-flora.description'),
      name: 'fauna-flora',
      image: '/medias/placeholder1.jpg',
    },
    {
      label: t('quantity.label'),
      description: t('quantity.description'),
      name: 'quantity',
      image: '/medias/placeholder2.jpg',
    },
    {
      label: t('quality.label'),
      description: t('quality.description'),
      name: 'quality',
      image: '/medias/placeholder3.jpg',
    },
    {
      label: t('landscape.label'),
      description: t('landscape.description'),
      name: 'landscape',
      image: '/medias/placeholder3.jpg',
    },
  ];
  return (
    <section className={cn(className)}>
      <h2 className="text-lg font-bold lg:text-2xl">
        <span className="block text-primary lg:mb-1">Contributions</span>
        <span className="tracking-tight">
          Citoyen, contribuez à la connaissance des rivières aux côtés des
          agents du parc
        </span>
      </h2>
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(item => (
          <Card key={item.name} className="group relative">
            <CardMedia>
              <Image
                loading="lazy"
                className="aspect-[4/3] h-auto w-auto object-cover transition-all group-hover:scale-105"
                src={item.image}
                alt=""
                width="400"
                height="300"
              />
            </CardMedia>
            <CardHeader>
              <CardTitle>
                <Link
                  className="after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:underline hover:after:shadow focus:after:shadow"
                  href={`/map/observation/${item.name}`}
                >
                  {item.label}
                </Link>
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
