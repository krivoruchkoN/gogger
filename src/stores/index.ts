import { createContext } from 'react';
import { makeObservable, observable } from 'mobx';

import userStore, { UserStore } from './userStore';
import friendsStore, { FriendsStore } from './friendsStore';
import eventsStore, { EventsStore } from './eventsStore';
import authStore, { AuthStore } from './authStore';

export class RootStore {
  userStore: UserStore;
  friendsStore: FriendsStore;
  eventsStore: EventsStore;
  authStore: AuthStore;
  loading: 'pending' | 'loading' | 'failed' = 'pending';

  constructor() {
    makeObservable(this, {
      loading: observable,
    });

    this.userStore = userStore;
    this.friendsStore = friendsStore;
    this.eventsStore = eventsStore;
    this.authStore = authStore;

    this.initApp();
  }

  initApp = async () => {
    try {
      this.loading = 'loading';
      const currentUser = await this.userStore.getCurrentUser('some user id');
      this.userStore.setCurrentUser(currentUser);

      const friends = await this.friendsStore.getFriendListByUserId(
        currentUser.id,
      );
      this.friendsStore.setFriendList(friends);
    } catch (error) {
      console.log('initApp', error);
      this.loading = 'failed';
    } finally {
      this.loading = 'pending';
    }
  };
}

const rootStore = new RootStore();
export const rootStoreContext = createContext(rootStore);

export default rootStore;
