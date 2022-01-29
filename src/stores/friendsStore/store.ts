import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

import * as FriendsTypes from './types';

const friendsMock: FriendsTypes.Friend[] = [
  {
    id: uuid(),
    isFavorite: false,
    lastLogin: new Date().toISOString(),
    commonFriends: [],
    email: 'Oleg@mail.com',
    name: {
      firstName: 'Oleg',
      lastName: 'Olegio',
    },
  },
  {
    id: uuid(),
    isFavorite: false,
    lastLogin: new Date().toISOString(),
    commonFriends: [],
    email: 'Denis@mail.com',
    name: {
      firstName: 'Denis',
      lastName: 'Denisio',
    },
  },
  {
    id: uuid(),
    isFavorite: false,
    lastLogin: new Date().toISOString(),
    commonFriends: [],
    email: 'Pavel@mail.com',
    name: {
      firstName: 'Pavel',
      lastName: 'Pavelio',
    },
  },
  {
    id: uuid(),
    isFavorite: false,
    lastLogin: new Date().toISOString(),
    commonFriends: [],
    email: 'Margo@mail.com',
    name: {
      firstName: 'Margo',
      lastName: 'Margo',
    },
  },
];

friendsMock[3].commonFriends = [friendsMock[0].id, friendsMock[2].id];

export class FriendsStore {
  friendList: FriendsTypes.Friend[] = [];
  loading: 'pending' | 'loading' | 'failed' = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  setFriendList = (list: FriendsTypes.Friend[]) => {
    this.friendList = list;
  };

  getFriendListByUserId = async (
    userId: string,
  ): Promise<FriendsTypes.Friend[]> => {
    try {
      this.loading = 'loading';
      // запрос лежит где-то в ../../apis
      const response = await new Promise(
        (resolve: (arr: FriendsTypes.Friend[]) => void) => {
          setTimeout(() => resolve(friendsMock), 1000);
        },
      );
      console.log('getFriendListByUserId', userId, response);
      return response;
    } catch (error: any) {
      // нужен механизм обработки ошибок
      console.log('getFriendListByUserId error', error);
      this.loading = 'failed';
      throw error;
    } finally {
      this.loading = 'pending';
    }
  };
}

const friendsStore = new FriendsStore();
export const friendsStoreContext = createContext(friendsStore);

export default friendsStore;
