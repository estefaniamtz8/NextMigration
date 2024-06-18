// eslint-disable-next-line import/no-named-as-default
import adminApiClient from '../../utils/axios';

export async function getProfessionsWithoutSegment() {
  const response = await adminApiClient.get(`/v1/professions/professions-without-segment`);
  const { data } = response;
  return data;
}

export async function getProfessions() {
  const response = await adminApiClient.get(`/v1/professions/`);
  const { data } = response;
  return data;
}

export async function getSegments() {
  const response = await adminApiClient.get(`/v1/professions/segments`);
  const { data } = response;
  return data;
}

export async function getDictionary() {
  const response = await adminApiClient.get(`/v1/professions/dictionary`);
  const { data } = response;
  return data;
}

export async function insertSegment({ segment }) {
  const response = await adminApiClient.post('/v1/professions/segment', {
    segment,
  });

  const { data } = response;
  return data;
}

export async function rejectProfession({ profession }) {
  const response = await adminApiClient.post('/v1/professions/profession-reject', {
    profession,
  });

  const { data } = response;
  return data;
}

export async function segmentProfession({ profession, segment }) {
  const response = await adminApiClient.post('/v1/professions/segment-profession', {
    profession,
    segment,
  });

  const { data } = response;
  return data;
}

export async function dictionaryToProfession({ profession, dictionary }) {
  const response = await adminApiClient.post('/v1/professions/dictionary-to-profession', {
    profession,
    dictionary,
  });

  const { data } = response;
  return data;
}

export async function insertProfession({ profession }) {
  const response = await adminApiClient.post(`/v1/professions/profession`, { profession });

  const { data } = response;
  return data;
}

export default getProfessionsWithoutSegment;
