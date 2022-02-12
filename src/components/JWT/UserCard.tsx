import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { APIUser } from '../../stores/userStore/types';

interface Props {
  user: APIUser;
}

const UserCard = ({ user }: Props) => (
  <View style={styles.wrap}>
    <Text>{`Почта юзера: ${user.email}`}</Text>
  </View>
);

// TODO удалить после того, как JWT пройдёт тесты

export default UserCard;

const styles = StyleSheet.create({
  wrap: {
    minHeight: 40,
    backgroundColor: 'aqua',
    opacity: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
});
