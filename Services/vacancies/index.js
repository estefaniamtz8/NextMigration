// eslint-disable-next-line import/no-named-as-default
import adminApiClient from 'utils/axios';

export async function getActiveVacancies() {
  const response = await adminApiClient.get('/v1/vacancies/actives');

  const { data } = response;
  return data;
}

export async function duplicateVacancy(input) {
  const response = await adminApiClient.post('/v1/jobs/clone', input);
  
  const { data } = response;
  return data;
}

export default { getActiveVacancies, duplicateVacancy };
