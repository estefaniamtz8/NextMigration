// eslint-disable-next-line import/no-named-as-default
import adminApiClient from '../../utils/axios';

export async function getAnalyticsMatchUniqueGeneral(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchUnique?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsMatchUniqueConfirmed(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchUnique?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsMatchUniqueNotConfirmed(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchUnique?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsTotalRegister(range, activeTable) {
  if (activeTable) {
    const response = await adminApiClient.get(`/v1/analytics/totalRegisterTable?range=${JSON.stringify(range)}`);
    const { data } = response;
    return data;
  }
  const response = await adminApiClient.get(`/v1/analytics/totalRegisterGraph?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsCatchment(range) {
  const response = await adminApiClient.get(`/v1/analytics/catchment?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsTalentDistribution(range) {
  const response = await adminApiClient.get(`/v1/analytics/talentDistribution?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsViabilityUsers(range) {
  const response = await adminApiClient.get(`/v1/analytics/viabilityUsers?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsViabilityUsersV1(range) {
  const response = await adminApiClient.get(`/v1/analytics/viabilityUsersV1?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsVacancyByCompany(activeTable) {
  if (activeTable) {
    const response = await adminApiClient.get(`/v1/analytics/vacancyByCompanyTable`);
    const { data } = response;
    return data;
  }
  const response = await adminApiClient.get(`/v1/analytics/vacancyByCompanyChart`);
  const { data } = response;
  return data;
}

export async function getAnalyticsTotalPostulations(range) {
  const response = await adminApiClient.get(`/v1/analytics/totalPostulations?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsCompaniesStatus(range) {
  const response = await adminApiClient.get(`/v1/analytics/companyStatus?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsPostulationsByCompany(range) {
  const response = await adminApiClient.get(`/v1/analytics/postulationsByCompany?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsValueMatchUsers(range) {
  const response = await adminApiClient.get(`/v1/analytics/valueMatchUsers?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsValueMatchAccepted(range) {
  const response = await adminApiClient.get(`/v1/analytics/valueMatchAccepted?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsValueMatchResponse(range) {
  const response = await adminApiClient.get(`/v1/analytics/valueMatchResponse?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsValueMatchPostulated(range) {
  const response = await adminApiClient.get(`/v1/analytics/valueMatchPostulated?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsViabilityUsersByGroup(range) {
  const response = await adminApiClient.get(`/v1/analytics/viabilityUsersByGroup?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsRegisterInfo(range) {
  const response = await adminApiClient.get(`/v1/analytics/registerInfo?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsMatchesHistoric(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchesHistoric?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsTotalMatches(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchesTotal?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsMatchesResponse(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchesResponse?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsUsersByCommunity(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsUsersByCommunity?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsValueOfferMatchUsers(range) {
  const response = await adminApiClient.get(`/v1/analytics/valueMatchUsersV2?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsUsersByCommunityViability(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsUsersByCommunityViability?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsUsersByCommunityViabilityActive(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsUsersByCommunityViabilityActive?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsViabilityUsersBySegment(range) {
  const response = await adminApiClient.get(`/v1/analytics/viabilityUsersBySegment?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsMapUsers(range) {
  const response = await adminApiClient.get(`/v1/analytics/mapUsers?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsMatchesResponse(range) {
  const response = await adminApiClient.get(`/v1/analytics/colaboratorsMatchesResponse?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsMatchesPercentage(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsMatchesPercentage?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsViabilityUsersByGroup(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsViabilityUsersByGroup?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsViabilityUsersBySegment(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsViabilityUsersBySegment?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsViabilityUsersByState(range) {
  const response = await adminApiClient.get(
    `/v1/analytics/colaboratorsViabilityUsersByState?range=${JSON.stringify(range)}`
  );
  const { data } = response;
  return data;
}

export async function getAnalyticsColaboratorsMatchesAnswered(range) {
  const response = await adminApiClient.get(`/v1/analytics/matchesAnswered?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsVacancyBySegment(range) {
  const response = await adminApiClient.get(`/v1/analytics/vacancyBySegment?range=${JSON.stringify(range)}`);
  const { data } = response;
  return data;
}

export async function getAnalyticsVacancyAndUsersSegments() {
  const response = await adminApiClient.get(`/v1/analytics/vacancyAndUsersSegments`);
  const { data } = response;
  return data;
}

export async function getCompanies() {
  const response = await adminApiClient.get(`/v1/analytics/companies`);
  const { data } = response;
  return data;
}

export async function getVacancies(data) {
  const response = await adminApiClient.get(`/v1/analytics/vacancies?data=${JSON.stringify(data)}`);
  const { data: dataToReturn } = response;
  return dataToReturn;
}

export async function getAnalyticsVacancyResponse(data) {
  const response = await adminApiClient.get(`/v1/analytics/vacancyResponse?data=${JSON.stringify(data)}`);
  const { data: dataToReturn } = response;
  return dataToReturn;
}

export default getAnalyticsMatchUniqueConfirmed;
