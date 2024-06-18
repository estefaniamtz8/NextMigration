// eslint-disable-next-line import/no-named-as-default
import adminApiClient from '../../utils/axios';

export async function sendPersonalizedWhatsApp(sendable) {
  const response = await adminApiClient.post('/v1/messages/sendPersonalized', sendable);

  const { data } = response;
  return data;
}

export default sendPersonalizedWhatsApp;
