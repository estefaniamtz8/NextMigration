import React, { useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { savePDF } from '@progress/kendo-react-pdf';
import Container from 'components/Container';
import AnalyticsHeader from 'components/pages/Analytics/components/Header';
import UserOps from 'components/pages/Analytics/UserOps';
import useProtection from 'routes/useProtection';


const DynamicUserOps = dynamic(() => import('components/pages/Analytics/UserOps'), { ssr: false });

/**
 * Component that handles the analytics page.
 * @component
 */
function AnalyticsPage() {
  
  const pdfExportComponent = useRef(null);

  
  const exportPDFWithComponent = useCallback(() => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 8,
        scale: 0.5,
        landscape: true,
        fileName: 'User Ops Analytics',
        forcePageBreak: '.page-break',
      });
    }
  }, []);

  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="max-xl container mx-auto">
          {/*
            Pass the necessary properties to the AnalyticsHeader component
            and provide it with the onExportPDF function
          */}
          <AnalyticsHeader showExport showAllLink={false} onExportPDF={exportPDFWithComponent} />
          {/* Use the reference to include the component that will be exported */}
          <div ref={pdfExportComponent}>
            <DynamicUserOps />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default useProtection(AnalyticsPage);
