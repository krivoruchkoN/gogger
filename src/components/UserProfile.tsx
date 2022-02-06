import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { userStoreContext } from '../stores/userStore';

const UserProfile = () => {
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
};

export default observer(UserProfile);
