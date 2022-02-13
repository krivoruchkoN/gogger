import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

import * as UserTypes from './types';
import UsersService from '../../api/services/UsersServices';
import globalErrorHandler from '../../api/globalErrorHandler';

const userMock: UserTypes.CurrentUser = {
  id: uuid(),
  auth: {
    login: 'l0g1n',
    password: 'p@ssW0rd',
  },
  name: { firstName: 'Nikita', middleName: 'Mobx', lastName: 'Lover' },
  email: 'Nikita@email.com',
  lastLogin: new Date().toISOString(),
};

export class UserStore {
  currentUser: UserTypes.CurrentUser | null = null;
  loading: 'pending' | 'loading' | 'failed' = 'pending';
  users: UserTypes.APIUser[] | [] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser = (user: UserTypes.CurrentUser) => {
    this.currentUser = user;
  };

  getCurrentUser = async (userId: string): Promise<UserTypes.CurrentUser> => {
    try {
      this.loading = 'loading';
      // запрос лежит где-то в ../../apis
      const response = await new Promise(
        (resolve: (arr: UserTypes.CurrentUser) => void) => {
          setTimeout(() => resolve(userMock), 1000);
        },
      );
      console.log('getFriendListByUserId', userId, response);
      return response;
    } catch (error: any) {
      // нужен механизм обработки ошибок
      console.log('getCurrentUser error', error);
      this.loading = 'failed';
      throw error;
    } finally {
      this.loading = 'pending';
    }
  };

  setUsers = (users: UserTypes.APIUser[]) => {
    this.users = users;
  };

  fetchAllUsers = async () => {
    try {
      this.loading = 'loading';
      const resp = await UsersService.fetchUsers();
      const usersFromServer = resp.data.results;
      this.setUsers(usersFromServer);
    } catch (error) {
      globalErrorHandler(error);
      this.loading = 'failed';
    } finally {
      this.loading = 'pending';
    }
  };

  clearUsers = () => {
    this.users = [];
  };
}

const userStore = new UserStore();
export const userStoreContext = createContext(userStore);

export default userStore;
