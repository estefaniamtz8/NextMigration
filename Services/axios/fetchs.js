import axios from 'axios';
import CryptoJS from 'crypto-js';
import { dbAuth } from 'services/firebase';
import { Production, urlBase } from '../../utils/environment';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const fetchDataGetAsync = async (url, otherURL) => {
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }

    const getData = await axios.request({
      url,
      method: 'GET',
      // baseURL: otherURL || urlBase,
      baseURL: urlBase || otherURL,
      headers,
    });
    return getData.data;
  } catch (err) {
    const data = { ...err.response }?.data?.info || {};
    return { success: false, info: data };
  }
};

export const fetchDataPostAsync = async (url, sendable, otherURL) => {
  const excludeDomain = 'intrare-api';
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }
    if ((otherURL || '').includes(excludeDomain) && typeof sendable === 'object') {
      const encripted = CryptoJS.AES.encrypt(JSON.stringify(sendable), process.env.REACT_APP_API_KEY_ATS).toString();
      const getData = await axios.request({
        url,
        // baseURL: otherURL || urlBase,
        baseURL: urlBase || otherURL,
        method: 'POST',
        data: {
          method: 'security.encrypt',
          hash: encripted,
        },
        headers,
      });
      return getData.data.body;
    }
    const getData = await axios.request({
      url,
      // baseURL: otherURL || urlBase,
      baseURL: urlBase || otherURL,
      method: 'POST',
      data: sendable,
      headers,
    });
    return getData.data.body;
  } catch (err) {
    if (!Production) console.error(err.message);
    const data = { ...err.response }?.data?.info || {};
    return { success: false, info: data };
  }
};

export const fetchDataDeleteAsync = async (url, sendable, otherURL) => {
  const excludeDomain = 'intrare-api';
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }
    if ((otherURL || '').includes(excludeDomain) && typeof sendable === 'object') {
      const encripted = CryptoJS.AES.encrypt(JSON.stringify(sendable), process.env.REACT_APP_API_KEY_ATS).toString();
      const getData = await axios.request({
        url,
        // baseURL: otherURL || urlBase,
        baseURL: urlBase || otherURL,
        method: 'DELETE',
        data: {
          method: 'security.encrypt',
          hash: encripted,
        },
        headers,
      });
      return getData.data.body;
    }
    const getData = await axios.request({
      url,
      // baseURL: otherURL || urlBase,
      baseURL: urlBase || otherURL,
      method: 'DELETE',
      data: sendable,
      headers,
    });
    return getData.data.body;
  } catch (err) {
    if (!Production) console.error(err.message);
    const data = { ...err.response }?.data?.info || {};
    return { success: false, info: data };
  }
};

export const fetchDataPatchAsync = async (url, sendable) => {
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }
    const getData = await axios.request({
      url,
      // baseURL: otherURL || urlBase,
      baseURL: urlBase,
      method: 'PATCH',
      data: sendable,
      headers,
    });
    return getData.data.body;
  } catch (err) {
    if (!Production) console.error(err.message);
    const data = { ...err.response }?.data?.info || {};
    return { success: false, info: data };
  }
};

export const fetchDataGetAsyncCX = async (url, otherURL) => {
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }

    const getData = await axios.request({
      url,
      method: 'GET',
      // baseURL: otherURL || urlBase,
      baseURL: urlBase || otherURL,
      headers,
    });
    return getData.data;
  } catch (err) {
    const data = { ...err.response }.data.info;
    return { success: false, info: data };
  }
};

export const fetchDataPostAsyncCX = async (url, sendable, otherURL) => {
  try {
    const dataToken = await dbAuth?.currentUser?.getIdTokenResult();
    if (dataToken?.token) {
      headers.authorization = `Bearer ${dataToken.token}`;
    }
    const getData = await axios.request({
      url,
      // baseURL: otherURL || urlBase,
      baseURL: urlBase || otherURL,
      method: 'POST',
      data: sendable,
      headers,
    });
    return getData.data;
  } catch (err) {
    const data = { ...err.response }.data.info;
    return { success: false, info: data };
  }
};
