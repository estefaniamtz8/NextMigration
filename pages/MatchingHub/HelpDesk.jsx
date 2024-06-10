import React from 'react';
import Link from 'next/link';

import Container from 'components/Container';
import { CalendarSkeleton } from 'components/Elements/Skeleton';
import { IoIosArrowBack } from 'react-icons/io';

const HelpDesk = React.lazy(() => import('components/pages/MatchingHub/components/HelpDesk'));

function HelpDeskPage() {
  return (
    <Container overflowY>
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto max-xl px-14">
          <Link href="/matchinghub">
            <a className="flex flex-row items-center gap-2 py-8 no-underline w-max text-txt">
              <IoIosArrowBack size={18} />
              <span className="text-sm">Regresar a MatchingHub</span>
            </a>
          </Link>
          <React.Suspense fallback={<CalendarSkeleton />}>
            <HelpDesk />
          </React.Suspense>
        </div>
      </div>
    </Container>
  );
}

export default HelpDeskPage;
