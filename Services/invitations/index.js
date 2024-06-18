// eslint-disable-next-line import/no-named-as-default
import adminApiClient from '../../utils/axios';

export async function inviteUsersToVacancy(sendable) {
  const response = await adminApiClient.post('/v1/invitations/inviteUsersToVacancy', sendable);

  const { data } = response;
  return data;
}

export default inviteUsersToVacancy;
