import { useRef, useCallback } from 'react'
import { savePDF } from '@progress/kendo-react-pdf'
import Container from 'components/Container'
import AnalyticsHeader from 'components/pages/Analytics/components/Header'
import AnalyticsOverview from 'components/pages/Analytics/components/Overview'
import BusinessOps from 'components/pages/Analytics/BusinessOps'

export default function AnalyticsBusinessPage() {
  const pdfExportComponent = useRef(null)

  const exportPDFWithComponent = useCallback(() => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 8,
        scale: 0.5,
        landscape: true,
        fileName: 'Business Ops Analytics',
        forcePageBreak: '.page-break'
      });
    }
  }, [pdfExportComponent])

  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="container max-xl mx-auto">
          <AnalyticsHeader showExport showAllLink={false} onExportPDF={exportPDFWithComponent} />
          <div ref={pdfExportComponent}>
            <AnalyticsOverview />
            <BusinessOps />
          </div>
        </div>
      </div>
    </Container>
  )
}
