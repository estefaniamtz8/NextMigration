import { Workbook } from '@progress/kendo-ooxml'
import { saveAs } from '@progress/kendo-file-saver'

const cells = (rows, type, callback) => {
  const result = []
  rows.forEach((axisRow, i) => {
    const row = []
    axisRow.cells.forEach((cell) => {
      if (cell) {
        row.push({
          background: '#7a7a7a',
          color: '#fff',
          verticalAlign: 'top',
          value: cell.caption,
          colSpan: cell.colSpan || 1,
          rowSpan: cell.rowSpan || 1,
        })
      }
    })
    if (callback) {
      callback(row, i)
    }
    result.push({
      cells: row,
      type,
    })
  })
  return result
}

const createExcelExportSheet = (
  columnHeaderRows,
  rowHeaderRows,
  dataCells,
  rowHeaderBreadth,
  columnHeaderBreadth,
  columnsWidth
) => {
  const columns = []
  for (let i = 0; i < rowHeaderBreadth; i++) {
    columns.push({
      autoWidth: true,
    });
  }
  for (let i = 0; i < columnHeaderBreadth; i++) {
    columns.push({
      autoWidth: false,
      width: columnsWidth,
    })
  }
  const columnRows = cells(columnHeaderRows, 'header')
  if (rowHeaderBreadth && columnRows[0].cells) {
    columnRows[0].cells.splice(0, 0, {
      background: '#7a7a7a',
      color: '#fff',
      value: '',
      colSpan: rowHeaderBreadth,
      rowSpan: columnHeaderRows.length,
    })
  }
  const dataCallback = (row, index) => {
    dataCells[index].cells.forEach((cell) => {
      row.push({
        background: '#dfdfdf',
        color: '#333',
        textAlign: 'left',
        value: Number(cell.data.value) || 0,
        colSpan: 1,
        rowSpan: 1,
      })
    })
  }
  const rowRows = cells(rowHeaderRows, 'data', dataCallback)
  const rows = columnRows.concat(rowRows)
  return {
    columns,
    rows,
    frozenColumns: rowHeaderBreadth,
    frozenRows: columnHeaderRows.length,
  }
}

const saveAsExcel = (pivotgridHandle) => {
  const {
    columnHeaderRows,
    rowHeaderRows,
    dataCells,
    rowHeaderBreadth,
    columnHeaderBreadth,
  } = pivotgridHandle
  const columnWidth = 200
  const sheets = [
    createExcelExportSheet(
      columnHeaderRows,
      rowHeaderRows,
      dataCells,
      rowHeaderBreadth,
      columnHeaderBreadth,
      columnWidth
    ),
  ]
  const fileName = 'Pivot.xlsx'
  const expOptions = {
    sheets,
  }
  const saveOptions = {}
  const workbook = new Workbook(expOptions)
  workbook.toDataURL().then((dataURL) => {
    saveAs(dataURL, fileName, saveOptions)
  })
}

export default saveAsExcel
