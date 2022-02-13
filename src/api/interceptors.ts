import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { setTokensToStorage } from '../commonUtils/utils';
import AuthService from './services/AuthService';

const errorHandler = async (
  error: AxiosError,
  axiosInstance: AxiosInstance,
): Promise<AxiosResponse> => {
  const originalRequest = error.config;
  const isInvalidRefreshToken =
    error.response?.data?.detail === 'Token is invalid or expired';

  if (error.response?.status === 401 && !isInvalidRefreshToken) {
    const response = await AuthService.getNewTokens();
    const { access, refresh: newRefreshToken } = response.data;
    await setTokensToStorage({
      accessToken: access,
      refreshToken: newRefreshToken,
    });
    return axiosInstance.request(originalRequest);
  }
  throw error;
};

const addInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const newHeaders = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return { ...config, headers: { ...newHeaders } };
    },
  );

  axiosInstance.interceptors.response.use(
    (config) => config,
    (error) => {
      errorHandler(error, axiosInstance);
    },
  );
};

export default addInterceptors;
