import React, { createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import rootStore, { RootStore } from './stores';

import TabNavigator from './components/TabNavigator';

Sentry.init({
  dsn: 'https://c22d97e008c44c459575b6c204cf9dc0@o1133804.ingest.sentry.io/6180640', // TODO ENV
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // Sentry recommend adjusting this value in production.
  tracesSampleRate: 1,
});

const RootStoreContext = createContext<RootStore | null>(null);

const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootStoreContext.Provider value={rootStore}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  </SafeAreaProvider>
);

export default Sentry.wrap(App);
