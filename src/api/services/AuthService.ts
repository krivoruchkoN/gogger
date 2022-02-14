import { AxiosResponse } from 'axios';

import $api from '../api';
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
}
