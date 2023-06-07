import Introduction from '@/components/introduction';
import SiteFooter from '@/components/site-footer';

import SuggestionProvider from './suggestion-provider';
import WelcomeBanner from './welcome-banner';

export default function HomeUI() {
  return (
    <>
      <main role="main">
        <WelcomeBanner />
        <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div>
            <Introduction className="my-8" />
            <SuggestionProvider />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
