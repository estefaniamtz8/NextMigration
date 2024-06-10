import { useRef, useCallback } from 'react'
import { savePDF } from '@progress/kendo-react-pdf'
import Container from 'components/Container'
import AnalyticsHeader from 'components/pages/Analytics/components/Header'
import saveAsExcel from 'components/pages/Analytics/components/Charts/Pivot/excel'
import dynamic from 'next/dynamic'

const PivotChart = dynamic(() => import('components/pages/Analytics/components/Charts/Pivot'), { ssr: false })

export default function AnalyticsAdvancedPage() {
  const pdfExportComponent = useRef(null)
  const pivotgrid = useRef(null)

  const exportPDFWithComponent = useCallback(() => {
    if (pdfExportComponent.current) {
      savePDF(pdfExportComponent.current, {
        paperSize: 'Letter',
        margin: 8,
        scale: 0.5,
        landscape: true,
        fileName: 'Advanced Compute Analytics',
        forcePageBreak: '.page-break'
      });
    }
  }, [pdfExportComponent])

  const onSaveExcel = useCallback(() => {
    if (pivotgrid.current) {
      saveAsExcel(pivotgrid.current);
    }
  }, [pivotgrid]);

  return (
    <Container overflowY>
      <div className="bg-cream">
        <div className="container max-xl mx-auto">
          <AnalyticsHeader
            showExport
            multipleExport
            showAllLink={false}
            onExportPDF={exportPDFWithComponent}
            onExportXLS={onSaveExcel}
          />

          <div className="py-2">
            <div ref={pdfExportComponent} className="rounded-2xl bg-white w-full h-[800px] overflow-y-scroll">
              <PivotChart ref={pivotgrid} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
