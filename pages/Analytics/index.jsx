import React from 'react'
import { savePDF } from '@progress/kendo-react-pdf'

import Container from 'components/Container'
import AnalyticsHeader from 'components/pages/Analytics/components/Header'

import saveAsExcel from 'components/pages/Analytics/components/Charts/Pivot/excel'

const PivotChart = React.lazy(() => import('components/pages/Analytics/components/Charts/Pivot'))

function AnalyticsAdvancedPage() {
  const pdfExportComponent = React.useRef(null)
  const pivotgrid = React.useRef(null)

  const exportPDFWithComponent = React.useCallback(() => {
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

  const onSaveExcel = React.useCallback(() => {
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
              <React.Suspense fallback="Cargando...">
                <PivotChart ref={pivotgrid} />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AnalyticsAdvancedPage
