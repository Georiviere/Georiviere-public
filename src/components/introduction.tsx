import Image from 'next/image';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function Introduction({ className }: Props) {
  return (
    <section className={cn(className)}>
      <h2 className="my-8 text-2xl font-bold tracking-tight">
        Découvez la démarche
      </h2>
      <div className="lg:grid lg:grid-cols-3">
        <Image
          className="ratio-[3/4] mb-4 hidden self-end lg:block xl:translate-x-4"
          src="/medias/illustration.jpg"
          alt=""
          width={800}
          height={600}
        />
        <div className="col-span-2 bg-primary p-4 py-2 text-primary-foreground lg:py-0 xl:pl-10">
          <p className="my-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            orci ex, tristique nec sem id, sagittis sodales neque. Aenean
            porttitor nunc vitae nisi fermentum tincidunt. Duis at tellus sed
            risus rhoncus maximus et ut erat. Vestibulum eu tempus odio, ac
            commodo justo. Cras eget sem ac elit aliquam scelerisque. Nulla id
            turpis metus. Fusce vel risus lacinia, lobortis ipsum ut, gravida
            felis. Donec at sollicitudin mi. Fusce ut nibh at libero feugiat
            faucibus. Sed maximus justo a tellus consectetur, eget accumsan
            libero ultrices. Vivamus sagittis faucibus pretium. Donec dui
            tortor, condimentum eu finibus at, feugiat lacinia lorem.
          </p>
          <p className="my-8">
            Sed tristique libero quis posuere luctus. Cras et efficitur nisl. Ut
            porta, ligula at auctor auctor, arcu sem tempor urna, vel convallis
            dui dolor quis neque. Fusce id rutrum lectus. Suspendisse potenti.
            Cras sodales semper bibendum. Praesent et viverra nulla. Nunc
            viverra ut sapien id ultricies. Fusce mollis venenatis metus, id
            imperdiet diam congue nec. Mauris suscipit suscipit velit, nec
            maximus est convallis eleifend. Phasellus a elit velit. Proin
            maximus, enim et gravida imperdiet, nunc enim elementum est, ut
            consectetur erat diam vel felis. Quisque feugiat nisl malesuada,
            fringilla sem non, consectetur nisi.
          </p>
        </div>
      </div>
    </section>
  );
}
