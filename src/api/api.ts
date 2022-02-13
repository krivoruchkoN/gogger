import axios from 'axios';
import addInterceptors from './interceptors';

export const HOST = 'http://62.84.124.94/api/';

const $api = axios.create({
  withCredentials: true,
  baseURL: HOST,
});

addInterceptors($api);

export default $api;
