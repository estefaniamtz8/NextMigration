import { useRef, useCallback } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import Container from 'components/Container';
import AnalyticsHeader from 'components/pages/Analytics/components/Header';
import ColaboratorsAnalytics from '../../components/pages/Analytics/ColaboratorsAnalytics';

export default function ColaboratorsPage() {
  const pdfExportComponent = useRef(null);

  const exportPDFWithComponent = useCallback(() => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 8,
        scale: 0.5,
        landscape: true,
        fileName: 'Datalytics v2',
        forcePageBreak: '.page-break',
      });
    }
  }, []);

  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="max-xl container mx-auto">
          <AnalyticsHeader showExport showAllLink={false} onExportPDF={exportPDFWithComponent} />
          <div ref={pdfExportComponent}>
            <ColaboratorsAnalytics />
          </div>
        </div>
      </div>
    </Container>
  );
}
