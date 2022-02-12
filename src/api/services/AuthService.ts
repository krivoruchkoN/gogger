import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';

import $api from '..';
import { AuthResponse } from '../../stores/authStore/types';
import routes from '../routes';

export default class AuthService {
  static login = async (
    email: string,
    pass: string,
  ): Promise<AxiosResponse<AuthResponse>> =>
    $api.post<AuthResponse>(routes.login, {
      email,
      password: pass,
    });

  static getNewTokens = async () => {
    const refresh = await AsyncStorage.getItem('refreshToken');
    return $api.post<AuthResponse>(routes.refresh, { refresh });
  };
}
