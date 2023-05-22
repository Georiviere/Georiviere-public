import { useTranslations } from 'next-intl';

import Contact from './footer/contact';
import Links from './footer/links';
import PartnerList from './footer/partner-list';

export default function SiteFooter() {
  const t = useTranslations('site');
  return (
    <footer
      className="text-foreground-accent border-t bg-accent"
      role="contentinfo"
    >
      <div className="container">
        <PartnerList className="my-8" />
        <div className="justify-between border-t py-8 sm:flex">
          <Contact />
          <Links />
        </div>
      </div>
    </footer>
  );
}
