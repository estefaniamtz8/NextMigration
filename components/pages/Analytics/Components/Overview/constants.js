/* TOTAL CANDIDATES CHART */
import { fetchDataGetAsync } from '../../../../../services/axios/fetchs';

const totalCandidatos = [
  { label: '2023-06-16', value: 1335 },
  { label: '2023-06-17', value: 1335 },
  { label: '2023-06-18', value: 1336 },
  { label: '2023-06-19', value: 1339 },
  { label: '2023-06-20', value: 1346 },
  { label: '2023-06-21', value: 1361 },
  { label: '2023-06-22', value: 1378 },
  { label: '2023-06-23', value: 1378 },
];
export const dataTotalCandidates = () =>
  totalCandidatos.map((candidate) => ({ id: candidate.label, value: candidate.value }));
export const totalCandidatesSeries = () => [
  { name: 'Total de Candidatos', valueYField: 'value', categoryXField: 'id', color: '#16CEB9' },
];
export const getTotalCandidates = () => totalCandidatos[totalCandidatos.length - 1].value;

export const getAllUsers = async () => {
  const result = await fetchDataGetAsync('/analytics/allUsers');
  if (result.body) {
    return result?.body[result?.body?.length - 1].value;
  }
  return 0;
};

/* TOTAL JOBS CHART */
const nuevosPuestosTrabajo = [
  { label: '2023-06-16', value: 0 },
  { label: '2023-06-17', value: 0 },
  { label: '2023-06-18', value: 0 },
  { label: '2023-06-19', value: 0 },
  { label: '2023-06-20', value: 454 },
  { label: '2023-06-21', value: 0 },
  { label: '2023-06-22', value: 0 },
  { label: '2023-06-23', value: 0 },
];
export const dataTotalJobs = () => nuevosPuestosTrabajo.map((job) => ({ id: job.label, value: job.value }));
export const totalJobsSeries = () => [
  { name: 'Total de Nuevos Trabajos', valueYField: 'value', categoryXField: 'id', color: '#029973' },
];
export const getTotalJobs = () => nuevosPuestosTrabajo[nuevosPuestosTrabajo.length - 1].value;

/* AVG FIT CHART */
const avgFitQuality = [
  {
    date: '2023-06-16',
    newMatchs: 0,
    newMatchsPerctAvg: 6.93,
  },
  {
    date: '2023-06-23',
    newMateches: 0,
    newMatchsPerctAvg: 46.44,
  },
];
export const dataAvgFit = () => avgFitQuality.map((job) => ({ id: job.date, value: job.newMatchsPerctAvg }));
export const avgFitSeries = () => [
  { name: 'Avg. Fit Quality', valueYField: 'value', categoryXField: 'id', color: '#4346D3' },
];
export const globalAvgFit = () => {
  let total = 0;
  avgFitQuality.forEach((avg) => {
    total += avg.newMatchsPerctAvg;
  });

  return Number(total / avgFitQuality.length).toFixed(0);
};
