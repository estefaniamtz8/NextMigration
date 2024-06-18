// eslint-disable-next-line import/no-named-as-default
import adminApiClient from 'utils/axios';

async function getArticles() {
  const response = await adminApiClient.get('/v1/article/all');

  const { data } = response;
  return data;
}

export async function getArticleById(id) {
  const response = await adminApiClient.get(`/v1/article?id=${id}`);

  const { data } = response;
  return data;
}

export async function createArticle(input) {
  const response = await adminApiClient.post('/v1/article', input);

  const { data } = response;
  return data;
}

export async function updateArticle(input) {
  const response = await adminApiClient.put('/v1/article', input, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const { data } = response;
  return data;
}

export async function deleteArticle(id) {
  const response = await adminApiClient.delete('/v1/article', { data: { id } });

  const { data } = response;
  return data;
}

export default getArticles;
