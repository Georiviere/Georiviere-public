import Image from 'next/image';
import Link from 'next/link';

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

export default function SuggestionListMap({ className }: Props) {
  const items = [
    {
      label: "Cours d'eau",
      description:
        "Naviguez sur la carte pour voir les informations détaillées sur les cours d'eau du territoire",
      image: '/medias/placeholder0.jpg',
      href: '/map?layers=8,10,12,14',
    },
    {
      label: 'Connaissances',
      description:
        "Visualisez l'ensemble des observations réalisées conjointement par le parc et les contributeurs",
      image: '/medias/placeholder0.jpg',
      href: '/map?layers=8,10,11,12,14',
    },
    {
      label: 'Actions',
      description:
        'Découvez les travaux du parc dans le cadre de la gestion du territoire aquatique (animation à venir, travaux, chantiers participatifs, etc.)',
      image: '/medias/placeholder0.jpg',
      href: '/map?layers=8,10,12,14',
    },
    {
      label: 'Zones sensibles',
      description:
        'Explorez les zones de protection du biotope et de la biodiversité',
      image: '/medias/placeholder0.jpg',
      href: '/map?layers=8,10,12,13,14',
    },
  ];
  return (
    <section className={cn(className)}>
      <h2 className="text-lg font-bold lg:text-2xl">
        <span className="block text-primary lg:mb-1">Connaissances</span>
        <span className="tracking-tight">
          Parcourez les données et actions liées au cours d&apos;eau sur le
          territoire
        </span>
      </h2>
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(item => (
          <Card key={item.label} className="group relative">
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
                  href={item.href}
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
