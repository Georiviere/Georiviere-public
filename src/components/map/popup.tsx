import { URLSearchParams } from 'url';
import Image from 'next/image';
import Link from 'next/link';

import { getLinkWithLayers } from '@/lib/utils';

import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from '../ui/card';

type Props = {
  name: string;
  params: URLSearchParams;
  description: string;
  attachments?: { thumbnail: string }[];
  type: string;
  id: string;
};

export default function Popup({
  attachments,
  params,
  name,
  description,
  type,
  id,
}: Props) {
  return (
    <Card className="group relative border-0">
      {attachments?.[0]?.thumbnail && (
        <CardMedia>
          <Image
            loading="lazy"
            className="aspect-[4/3] h-auto w-auto object-cover transition-all group-hover:scale-105"
            src={attachments[0].thumbnail}
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
            href={getLinkWithLayers(`/map/${type}/${id}`, params)}
          >
            {name}
          </Link>
        </CardTitle>
        <CardDescription className="truncate">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
