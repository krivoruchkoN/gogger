import React, { useContext } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { eventsStoreContext } from '../stores/eventsStore';

const EventList = () => {
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
};

export default observer(EventList);
