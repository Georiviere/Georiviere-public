import Link from 'next/link';
import { Suggestion } from '@/api/settings';

import { cn, convertAttachementsToImages } from '@/lib/utils';

import Carousel from './carousel';
import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from './ui/card';

type Props = Suggestion & {
  className?: string;
};

export default function SuggestionList({
  title,
  subtitle,
  content,
  className,
}: Props) {
  if (content === undefined || content.length === 0) {
    return null;
  }
  return (
    <section className={cn(className)}>
      <h2 className="text-lg font-bold lg:text-2xl">
        <span className={cn('block lg:mb-1', subtitle && 'text-primary')}>
          {title}
        </span>
        {subtitle && <span className="tracking-tight">{subtitle}</span>}
      </h2>
      <div
        className={cn(
          'grid gap-4 py-4 sm:grid-cols-2',
          content.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
        )}
      >
        {content.map(item => (
          <Card key={item.label} className="group relative">
            {item.images?.[0]?.thumbnail && (
              <CardMedia>
                <Carousel
                  className="aspect-[4/3] h-auto w-auto object-cover transition-all group-hover:scale-105"
                  images={convertAttachementsToImages(item.images, true)}
                  width={400}
                  height={300}
                />
              </CardMedia>
            )}
            <CardHeader>
              <CardTitle>
                <Link
                  className="after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:underline hover:after:shadow focus:after:shadow"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-4">
                {item.description
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
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
