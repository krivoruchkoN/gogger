type ISODate = string;

export interface Event {
  id: string;
  label: string;
  time: ISODate;
  address: string;
  type: 'public' | 'private';
  capasity: number;
}
