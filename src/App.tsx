import React, { createContext, useContext } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';

import rootStore, { RootStore, rootStoreContext } from './stores';
import { userStoreContext } from './stores/userStore';
import { friendsStoreContext } from './stores/friendsStore';
import { eventsStoreContext } from './stores/eventsStore';

const UserProfile = observer(() => {
  const userStore = useContext(userStoreContext);
  const { currentUser } = userStore;
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: '700' }}>Текущий пользователь</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>{currentUser?.name.firstName}</Text>
        <Text>{currentUser?.name.middleName}</Text>
        <Text>{currentUser?.name.lastName}</Text>
      </View>
    </View>
  );
});

const FriendList = observer(() => {
  const friendStore = useContext(friendsStoreContext);
  const { friendList } = friendStore;
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: '700' }}>Друзья</Text>
      <ScrollView>
        {friendList.map((friend) => (
          <View key={friend.id} style={{ margin: 4, flexDirection: 'row' }}>
            <Text>{friend.name.firstName}</Text>
            <Text>{friend.name.lastName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const EventList = observer(() => {
  const eventsStore = useContext(eventsStoreContext);
  const { eventList, loading } = eventsStore;

  if (loading === 'loading') {
    return (
      <View>
        <Text>Загрузка событий...</Text>
      </View>
    );
  }
  return eventList.length === 0 ? (
    <Button title="Загрузить события" onPress={() => eventsStore.getEvents()} />
  ) : (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: '700' }}>События</Text>
      <ScrollView>
        {eventList.map((event) => (
          <View key={event.id} style={{ margin: 4, flexDirection: 'row' }}>
            <Text>{event.label}</Text>
            <Text>{event.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const Home = observer(() => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const rootStore = useContext(rootStoreContext);
  const { loading } = rootStore;

  return (
    <SafeAreaView>
      {loading === 'loading' ? (
        <View>
          <Text>Загрузка приложения ...</Text>
        </View>
      ) : (
        <View>
          <UserProfile />
          <FriendList />
          <EventList />
        </View>
      )}
    </SafeAreaView>
  );
});

const RootStoreContext = createContext<RootStore | null>(null);

const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView>
      <RootStoreContext.Provider value={rootStore}>
        <Home />
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  </SafeAreaProvider>
);

export default App;
