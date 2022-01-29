import { UserTypes } from '../userStore';

type FriendId = string;

export interface Friend extends UserTypes.User {
  isFavorite: boolean;
  commonFriends: FriendId[];
}
