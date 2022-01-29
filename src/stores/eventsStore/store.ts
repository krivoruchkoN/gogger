import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

import * as EventsTypes from './types';

const eventsMock: EventsTypes.Event[] = [
  {
    id: uuid(),
    label: 'Friday party',
    time: new Date().toISOString(),
    address: 'Liis Office',
    type: 'private',
    capasity: 10,
  },
  {
    id: uuid(),
    label: 'Working monday',
    time: new Date().toISOString(),
    address: 'work',
    type: 'public',
    capasity: 50,
  },
  {
    id: uuid(),
    label: 'Nikita`s Birthday Party',
    time: new Date().toISOString(),
    address: 'Sochi',
    type: 'private',
    capasity: 100,
  },
];

export class EventsStore {
  eventList: EventsTypes.Event[] = [];
  loading: 'pending' | 'loading' | 'failed' = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  setEvents = (events: EventsTypes.Event[]) => {
    this.eventList = events;
  };

  getEvents = async (): Promise<EventsTypes.Event[]> => {
    try {
      this.loading = 'loading';
      // запрос лежит где-то в ../../apis
      const response = await new Promise(
        (resolve: (arr: EventsTypes.Event[]) => void) => {
          setTimeout(() => resolve(eventsMock), 1000);
        },
      );
      console.log('getEvents', response);
      this.setEvents(response);
      return response;
    } catch (error: any) {
      // нужен механизм обработки ошибок
      console.log('getEvents error', error);
      this.loading = 'failed';
      throw error;
    } finally {
      this.loading = 'pending';
    }
  };
}

const eventsStore = new EventsStore();
export const eventsStoreContext = createContext(eventsStore);

export default eventsStore;
