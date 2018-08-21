/* eslint no-param-reassign: 0 */
import axios from 'axios';
import { getCookie } from '../helpers/constants'

export const fetchData = async ({
  method,
  url,
  urlCustom = '',
  headersAdditional = {},
  params = {},
  body = {},
}) => {
  let URL = `${process.env.REACT_APP_API}/${url}`;

  let Action = null;

  let headers = {
    'Content-Type': 'application/json',
  };

  if (getCookie('auth', `${process.env.REACT_APP_PROJECT}_accessToken`)) {
    Object.assign(headers, {
      Authorization: `Bearer ${getCookie('auth', `${process.env.REACT_APP_PROJECT}_accessToken`)}`,
    })
  }

  if (Object.keys(headersAdditional).length > 0) {
    Object.assign(headers, headersAdditional);
  }

  if (urlCustom) URL = urlCustom;

  if (method === 'get') {
    Action = axios[method](URL, {
      params,
      headers,
    });
  } else {
    const BODY = {
      method,
      url: URL,
      headers,
      data: body,
      params,
    };

    Action = axios(BODY);
  }

  return new Promise((resolve, reject) => 
    Action
    .then(res => resolve(res))
    .catch((error) => {
      // if (error.response) {
      //   // The request was made and the server responded with a status code
      //   // that falls out of the range of 2xx
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //   // http.ClientRequest in node.js
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
      // console.log(error.config);

      reject(error)
    })
  );
};

export default fetchData;
