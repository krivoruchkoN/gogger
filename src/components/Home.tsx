import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { rootStoreContext } from '../stores';
import SentryComponent from './SentryComponent';
import AmplitudeComponent from './AmplitudeComponent';
import UserProfile from './UserProfile';
import FriendList from './FriendList';
import EventList from './EventList';

const Home = () => {
  const rootStore = useContext(rootStoreContext);
  const { loading } = rootStore;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading === 'loading' ? (
        <View>
          <Text>Загрузка приложения ...</Text>
        </View>
      ) : (
        <ScrollView>
          <UserProfile />
          <FriendList />
          <EventList />
        </ScrollView>
      )}
      <ScrollView>
        <SentryComponent />
        <AmplitudeComponent />
      </ScrollView>
    </View>
  );
};

export default observer(Home);
