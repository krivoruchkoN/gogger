/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './services/AuthService';
import { setTokensToStorage } from '../commonUtils/utils';
// обсудить с мобильщиками - у меня тут циклическая зависимость, но я думаю, что это норм

export const HOST = 'http://62.84.124.94/api/';

const $api = axios.create({
  withCredentials: true,
  baseURL: HOST,
});

$api.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    // обсудить с мобильщиками ругается ts и я не понимаю что нужно сделать (
    return config;
  },
);

const errorHandler = async (e: AxiosError): Promise<AxiosResponse> => {
  const originalRequest = e.config;
  const isInvalidRefreshToken =
    e.response?.data?.detail === 'Token is invalid or expired';

  if (e.response?.status === 401 && !isInvalidRefreshToken) {
    try {
      const response = await AuthService.getNewTokens();
      const { access, refresh: newRefreshToken } = response.data;
      await setTokensToStorage({
        accessToken: access,
        refreshToken: newRefreshToken,
      });
      // await AsyncStorage.setItem('accessToken', access);
      // await AsyncStorage.setItem('refreshToken', newRefreshToken);
      return $api.request(originalRequest);
      // обсудить с мобильщиками - как это типизировать?
    } catch (error) {
      console.log('!!! ошибка в интерцепторе');
    }
  }
  throw e;
};

$api.interceptors.response.use((config) => config, errorHandler);

export default $api;
