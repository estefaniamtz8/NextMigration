import { useRef, useCallback } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import { Next } from 'next'; 
import Container from '../../components/Container';
import AnalyticsHeader from '../../components/pages/Analytics/components/Header';
import AlgorithmAnalytics from '../../components/pages/Analytics/AlgorithmOps';

function AlgorithmPage() {
  const pdfExportComponent = useRef(null);

  const exportPDFWithComponent = useCallback(() => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 8,
        scale: 0.5,
        landscape: true,
        fileName: 'Analytics',
        forcePageBreak: '.page-break',
      });
    }
  }, [pdfExportComponent]);

  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="max-xl container mx-auto">
          <AnalyticsHeader showExport multipleExport showAllLink={false} onExportPDF={exportPDFWithComponent} />
          <div className="py-2">
            <div ref={pdfExportComponent} className="w-full bg-cream">
              <Next.Suspense fallback="Cargando..."> {/* Cambio en la importación de Suspense */}
                <AlgorithmAnalytics />
              </Next.Suspense>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AlgorithmPage;
