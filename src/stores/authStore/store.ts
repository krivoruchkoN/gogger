import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from './types';
import AuthService from '../../api/services/AuthService';
import { setTokensToStorage } from '../../commonUtils/utils';
import { globalErrorHandler } from '../../api/globalErrorHandler';

export class AuthStore {
  loading: 'pending' | 'loading' | 'failed' = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  login = async (
    email: string = 'p7chkn@yandex.ru',
    pass: string = 'OlegTheBest2022',
  ): Promise<AuthResponse | void> => {
    // обсудить с мобильщиками - такой тип - норм?
    try {
      this.loading = 'loading';
      const response = await AuthService.login(email, pass);
      const { access, refresh } = response.data;
      await setTokensToStorage({ accessToken: access, refreshToken: refresh });
      return response.data;
    } catch (error) {
      globalErrorHandler(error);
      // обсудить. Не поинмаю почему TS ругается
      this.loading = 'failed';
    } finally {
      this.loading = 'pending';
    }
  };

  logout = async (): Promise<void> => {
    await AsyncStorage.clear();
  };
}

const authStore = new AuthStore();
export const authStoreContext = createContext(authStore);

export default authStore;
