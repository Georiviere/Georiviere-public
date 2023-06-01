import Image from 'next/image';
import Link from 'next/link';
import { Poi } from '@/api/poi';

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
  pois: Poi[];
};

export default function SuggestionListPois({ pois, className }: Props) {
  if (pois.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      <h2 className="text-lg font-bold lg:text-2xl">
        <span className="tracking-tight">Dernières actions</span>
      </h2>
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {pois.map(poi => (
          <Card key={poi.id} className="group relative">
            {poi.attachments?.[0]?.thumbnail && (
              <CardMedia>
                <Image
                  loading="lazy"
                  className="aspect-[4/3] h-auto w-auto object-cover transition-all group-hover:scale-105"
                  src={poi.attachments[0].thumbnail}
                  alt=""
                  width="400"
                  height="300"
                />
              </CardMedia>
            )}
            <CardHeader>
              <CardTitle>
                <Link
                  className="after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:underline hover:after:shadow focus:after:shadow"
                  href={`/map/pois/${poi.id}`}
                >
                  {poi.name}
                </Link>
              </CardTitle>
              {poi.description && (
                <CardDescription className="line-clamp-4">
                  {poi.description
                    .split('\r\n')
                    .filter((line: string) => line.trim() !== '')
                    .map((line: string, index: number) => {
                      return (
                        <span key={index} className="py-4">
                          {line}
                        </span>
                      );
                    })}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
