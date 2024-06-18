// eslint-disable-next-line import/no-named-as-default
import adminApiClient from "utils/axios";

async function getTags() {
  const response = await adminApiClient.get('/v1/tags');

  const { data } = response;
  return data;
}

export async function createTag(input) {
  const response = await adminApiClient.post('/v1/tags', input);
  
  const { data } = response;
  return data;
}

export async function deleteTag(id) {
  const response = await adminApiClient.delete('/v1/tags', { data: { id } });

  const { data } = response;
  return data;
}

export async function updateUserTags(input) {
  const response = await adminApiClient.post('v1/tags/user', input);

  const { data } = response;
  return data;
}

export default getTags;