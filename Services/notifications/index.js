// eslint-disable-next-line import/no-named-as-default
import adminApiClient from 'utils/axios';

async function getNotificationsByUser(id, showTimeLine) {
  if (showTimeLine) {
    const response = await adminApiClient.get(`/v1/notifications/user/${id}`);

    const { data } = response;
    return data;
  }
  return {
    success: true,
    notifications: [],
  };
}

export async function addCustomEvent({
  userID,
  templateID,
  type = 'custom_event',
  name,
  description = '',
  metadata = {},
}) {
  const response = await adminApiClient.post('/v1/notifications/event', {
    userID,
    templateID,
    type,
    name,
    description,
    metadata,
  });

  const { data } = response;
  return data;
}

export async function notificationMassive(selectedUsers) {
  const response = await adminApiClient.post('/v1/notifications/notifyCompleteMassive', selectedUsers);

  const { data } = response;
  return data;
}

export default getNotificationsByUser;
