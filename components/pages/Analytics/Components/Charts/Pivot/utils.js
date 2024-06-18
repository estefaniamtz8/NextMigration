import {
  sumAggregate,
  averageAggregate,
  dataCells
} from '@progress/kendo-react-pivotgrid';

export const parseDataForPivot = (data) => data.map((item) => ({
  ID: item.IDIntrare,
  Active: item.active || item.activeSearchJob === 'si' || item.activeSearchJob === 'Si' ? 'Si' : 'No',
  Nationality: item.dataToAdmin?.nationality?.value || 'Sin Nacionalidad',
  Status: !item.status || item.status === '' ? 'Sin status' : item.status,
  Gender: item.gender ? item.gender.label : 'Sin registro',
  Program: item.program && item.program !== '' ? item.program : 'N/A',
  AboutOurProgram: item.aboutOurProgram && item.aboutOurProgram !== '' ? item.aboutOurProgram : 'N/A',
  Total: 1,
}))

export const dimensions = {
  Active: {
    caption: 'Activo',
    displayValue: (item) => item.Active,
    sortValue: (displayValue) => displayValue,
  },
  Nationality: {
    caption: 'Nacionalidad',
    displayValue: (item) => item.Nationality,
    sortValue: (displayValue) => displayValue,
  },
  Status: {
    caption: 'Status',
    displayValue: (item) => item.Status,
    sortValue: (displayValue) => displayValue,
  },
  Gender: {
    caption: 'Genero',
    displayValue: (item) => item.Gender,
    sortValue: (displayValue) => displayValue,
  },
  Program: {
    caption: 'Programa',
    displayValue: (item) => item.Program,
    sortValue: (displayValue) => displayValue,
  },
  AboutOurProgram: {
    caption: 'Sobre nuestro programa',
    displayValue: (item) => item.AboutOurProgram,
    sortValue: (displayValue) => displayValue,
  }
};

export const measures = [
  {
    name: 'Total',
    value: (item) => item.Total,
    aggregate: sumAggregate,
  },
  {
    name: 'Average',
    value: (item) => item.Total,
    aggregate: averageAggregate,
  },
];

export const defaultMeasureAxes = [
  {
    name: ['Total'],
  },
];

export const defaultRowAxes = [
  {
    name: ['Active'],
    expand: true,
  },
  {
    name: ['Nationality'],
  },
  {
    name: ['Gender'],
  },
];

export const defaultColumnAxes = [
  {
    name: ['Status'],
  }
];

export const defaultFilter = [];

export const defaultSort = Object.keys(dimensions).map((k) => ({
  field: k,
  dir: 'asc',
}));

export const getChartData = (pivotProps) => {
  const cells = dataCells(pivotProps.rows, pivotProps.columns, pivotProps.data);
  const series = [];
  const stacks = new Set();
  if (cells.length > 1) {
    cells.pop();
  }
  cells.forEach((m) => {
    if (m.cells.length > 1) {
      m.cells.pop();
    }
    const rows = m.row
      .filter((x) => x.includes('&'))
      .map((v) => v.substring(v.indexOf('&') + 1));
    if (rows.length === 1 && stacks.has(rows[0])) {
      return;
    } if (rows.length > 1) {
      stacks.add(rows[0]);
    }
    series.push({
      name: rows[rows.length - 1],
      stack: rows.length > 1 ? rows[0] : rows.join('-'),
      data: m.cells.map((d) => parseFloat(d.data && d.data.value)),
    });
  });
  let categories = [];
  if (cells[0]) {
    categories = cells[0].cells.map((c) =>
      c.columnTuple.members.map((m) => m.caption).join('/')
    );
  }
  return {
    series,
    categories,
  };
};

