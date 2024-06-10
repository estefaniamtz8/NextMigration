import React from 'react';
import Container from 'components/Container';
import Link from 'next/link';
import AnalyticsOverview from 'components/pages/Analytics/components/Overview';
import AnalyticsJobs from 'components/pages/Analytics/components/Jobs';

function HomePage() {
  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="container mx-auto max-xl xl:px-4 2xl:px-20">
          <div className="flex flex-row justify-between w-full py-8">
            <h2 className="text-2xl font-medium">De un vistazo</h2>
            <Link href="/analytics">
              <a className="text-sm no-underline text-purple">Ver todo</a>
            </Link>
          </div>
          <AnalyticsOverview />

          <div className="flex flex-row justify-between w-full pt-8 pb-6">
            <h2 className="text-2xl font-medium">Trabajos Recientes</h2>
            <Link href="/companies">
              <a className="text-sm no-underline text-purple">Ver todo</a>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-light-four">
        <div className="container pb-4 mx-auto max-xl xl:px-4 2xl:px-20">
          <AnalyticsJobs />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
