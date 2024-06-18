import groupBy from 'lodash/groupBy';

export const funnelData = [
  { value: 10, category: 'One' },
  { value: 9, category: 'Two' },
  { value: 6, category: 'Three' },
  { value: 5, category: 'Four' },
  { value: 4, category: 'Five' },
];

/* ORIGIN MAP CHART */
// export const mapData = [
//   {
//     "id": "AF",
//     "value":3,
//     "name":"Afganistan"
//   },
//   {
//     "id": "AI",
//     "value":2,
//     "name":"Anguilla"
//   },
//   {
//     "id": "AQ",
//     "value":1,
//     "name":"Antártida"
//   },
//   {
//     "id": "AG",
//     "value":1,
//     "name":"Antigua y Barbuda"
//   },
//   {
//     "id": "AR",
//     "value":4,
//     "name":"Argentina"
//   },
//   {
//     "id": "AT",
//     "value":1,
//     "name":"Austria"
//   },
//   {
//     "id": "BD",
//     "value":1,
//     "name":"Banglades"
//   },
//   {
//     "id": "BO",
//     "value":2,
//     "name":"Bolivia"
//   },
//   {
//     "id": "BR",
//     "value":2,
//     "name":"Brasil"
//   },
//   {
//     "id": "CM",
//     "value":1,
//     "name":"Camerun"
//   },
//   {
//     "id": "CL",
//     "value":3,
//     "name":"Chile"
//   },
//   {
//     "id": "CO",
//     "value":122,
//     "name":"Colombia"
//   },
//   {
//     "id": "CU",
//     "value":58,
//     "name":"Cuba"
//   },
//   {
//     "id": "EC",
//     "value":13,
//     "name":"Ecuador"
//   },
//   {
//     "id": "EG",
//     "value":1,
//     "name":"Egipto"
//   },
//   {
//     "id": "SV",
//     "value":46,
//     "name":"El Salvador"
//   },
//   {
//     "id": "US",
//     "value":2,
//     "name":"Estados Unidos"
//   },
//   {
//     "id": "GH",
//     "value":2,
//     "name":"Ghana"
//   },
//   {
//     "id": "GR",
//     "value":1,
//     "name":"Grecia"
//   },
//   {
//     "id": "GT",
//     "value":24,
//     "name":"Guatemala"
//   },
//   {
//     "id": "GN",
//     "value":2,
//     "name":"Guinea"
//   },
//   {
//     "id": "HT",
//     "value":79,
//     "name":"Haiti"
//   },
//   {
//     "id": "HT",
//     "value":22,
//     "name":"Haití"
//   },
//   {
//     "id": "HN",
//     "value":87,
//     "name":"Honduras"
//   },
//   {
//     "id": "IR",
//     "value":1,
//     "name":"Iran"
//   },
//   {
//     "id": "JM",
//     "value":1,
//     "name":"Jamaica"
//   },
//   {
//     "id": "MX",
//     "value":97,
//     "name":"Mexico"
//   },
//   {
//     "id": "NI",
//     "value":14,
//     "name":"Nicaragua"
//   },
//   {
//     "id": "PA",
//     "value":1,
//     "name":"Panama"
//   },
//   {
//     "id": "PE",
//     "value":6,
//     "name":"Peru"
//   },
//   {
//     "id": "CG",
//     "value":1,
//     "name":"Republica del Congo"
//   },
//   {
//     "id": "DO",
//     "value":3,
//     "name":"Republica Dominicana"
//   },
//   {
//     "id": "DO",
//     "value":1,
//     "name":"República Dominicana"
//   },
//   {
//     "id": "RU",
//     "value":3,
//     "name":"Rusia"
//   },
//   {
//     "id": "SY",
//     "value":1,
//     "name":"Siria"
//   },
//   {
//     "id": "TR",
//     "value":1,
//     "name":"Turquia"
//   },
//   {
//     "id": "UA",
//     "value":2,
//     "name":"Ucrania"
//   },
//   {
//     "id": "UY",
//     "value":2,
//     "name":"Uruguay"
//   },
//   {
//     "id": "VE",
//     "value":333,
//     "name":"Venezuela"
//   },
//   {
//     "value":400,
//     "name": "No Respondio"
//   }
// ]
// export const candidatesByOrigin = mapData.filter((data) => data.name !== 'No Respondio')
export const totalCandidatesByOrigin = (mapData) => {
  let total = 0;
  mapData?.forEach((country) => {
    total += Number(country?.value);
  });
  const withoutCountry = mapData?.find((data) => data.name === 'No Respondio').value;
  return { total, withoutCountry };
};

/* DIVERSITY BREAKDOWN LINE CHART */
const diversityBreakDown = {
  'Madre Soltera': [
    {
      label: '2023-05-30',
      value: 4,
      percent: 0.41,
    },
    {
      label: '2023-05-31',
      value: 6,
      percent: 0.61,
    },
  ],
  Migrante: [
    {
      label: '2023-05-30',
      value: 328,
      percent: 33.95,
    },
    {
      label: '2023-05-31',
      value: 515,
      percent: 53.31,
    },
  ],
  Refugiado: [
    {
      label: '2023-05-30',
      value: 224,
      percent: 23.19,
    },
    {
      label: '2023-05-31',
      value: 402,
      percent: 41.61,
    },
  ],
  'Persona Retornada': [
    {
      label: '2023-05-30',
      value: 5,
      percent: 0.52,
    },
    {
      label: '2023-05-31',
      value: 6,
      percent: 0.62,
    },
  ],
  'LGBTQI+': [
    {
      label: '2023-05-30',
      value: 3,
      percent: 0.31,
    },
    {
      label: '2023-05-31',
      value: 8,
      percent: 0.83,
    },
  ],
  'Ninguno de los anteriores': [
    {
      label: '2023-05-30',
      value: 21,
      percent: 2.18,
    },
    {
      label: '2023-05-31',
      value: 42,
      percent: 4.35,
    },
  ],
};
export const diversityBreakdownSeries = () => {
  const series = [];
  Object.keys(diversityBreakDown).forEach((key, index) => {
    series.push({ name: key, valueYField: `value${index}`, categoryXField: 'id' });
  });

  return series;
};

export const parseDiversityData = (valuesData) => {
  const data = [];
  Object.keys(valuesData || {}).forEach((key, index) => {
    valuesData[key].forEach((values) => {
      data.push({ id: values.label, [`value${index}`]: values.percent });
    });
  });
  const gropuedBy = groupBy(data, 'id');
  const parsedData = Object.keys(gropuedBy).map((key) => {
    const obj = {
      id: key,
    };
    gropuedBy[key].forEach((subArr, index) => {
      obj[`value${index}`] = subArr[`value${index}`];
    });
    return obj;
  });
  return parsedData;
};

/* DIVERSITY BREAKDOWN PERCENT */

export const diversityPercentData = [
  {
    category: 'inProcess',
    value: 50,
  },
  {
    category: 'noViable',
    value: 1013,
  },
  {
    category: 'viable',
    value: 37,
  },
];

/* REFERRAL BREAKDOWN CIRCLE DONUT CHART */
const originsPlatforms = [
  {
    label: 'Internal',
    value: 3,
    percent: 0.22,
  },
  {
    label: 'No Especificado',
    value: 321,
    percent: 23.29,
  },
  {
    label: 'Otros',
    value: 877,
    percent: 63.64,
  },
  {
    label: 'Partner',
    value: 97,
    percent: 7.04,
  },
  {
    label: 'Redes',
    value: 80,
    percent: 5.81,
  },
];
export const originPlatformsData = () =>
  originsPlatforms.map((origin) => ({ category: origin.label, value: origin.value }));

/* REFERRAL SOCIAL SEMICIRCLE CHART */
const referralSocialNetwors = [
  {
    label: 'Facebook',
    value: 43,
  },
  {
    label: 'Social Networks',
    value: 2,
  },
  {
    label: 'Facebook COMAR',
    value: 23,
  },
  {
    label: 'Feria de Empleo',
    value: 4,
  },
  {
    label: 'Instagram Intrare',
    value: 3,
  },
  {
    label: 'Facebook Intrare',
    value: 5,
  },
];

export const referralSocialData = () =>
  referralSocialNetwors.map((referral) => ({ value: referral.value, category: referral.label }));

/* TEST DATA (random) */
export const lineData = [
  {
    id: 0,
    value: 1000,
    value2: 1500,
  },
  {
    id: 1,
    value: 800,
    value2: 1100,
  },
  {
    id: 2,
    value: 300,
    value2: 2000,
  },
  {
    id: 3,
    value: 1500,
    value2: 950,
  },
  {
    id: 4,
    value: 500,
    value2: 1000,
  },
  {
    id: 5,
    value: 250,
    value2: 650,
  },
];

export const scatterData = [
  {
    ax: 1,
    ay: 0.5,
    bx: 1,
    by: 2.2,
  },
  {
    ax: 2,
    ay: 1.3,
    bx: 2,
    by: 4.9,
  },
  {
    ax: 3,
    ay: 2.3,
    bx: 3,
    by: 5.1,
  },
  {
    ax: 4,
    ay: 2.8,
    bx: 4,
    by: 5.3,
  },
  {
    ax: 5,
    ay: 3.5,
    bx: 5,
    by: 6.1,
  },
  {
    ax: 6,
    ay: 5.1,
    bx: 6,
    by: 8.3,
  },
  {
    ax: 7,
    ay: 6.7,
    bx: 7,
    by: 10.5,
  },
  {
    ax: 8,
    ay: 8,
    bx: 8,
    by: 12.3,
  },
  {
    ax: 9,
    ay: 8.9,
    bx: 9,
    by: 14.5,
  },
  {
    ax: 10,
    ay: 9.7,
    bx: 10,
    by: 15,
  },
  {
    ax: 11,
    ay: 10.4,
    bx: 11,
    by: 18.8,
  },
  {
    ax: 12,
    ay: 11.7,
    bx: 12,
    by: 19,
  },
];

export const scatterSeries = [
  { name: 'Serie1', valueYField: 'ay', valueXField: 'ax', color: '#F7517F' },
  { name: 'Serie2', valueYField: 'by', valueXField: 'bx', color: '#6648FF' },
];

export const serie1 = { name: 'Serie1', valueYField: 'value', categoryXField: 'id', color: '#16CEB9' };
export const serie2 = { name: 'Serie2', valueYField: 'value2', categoryXField: 'id', color: '#029973' };
export const series = [serie1, serie2];
