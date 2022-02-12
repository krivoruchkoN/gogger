import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import SimpleButton from '../common/SimpleButton';
import { authStoreContext } from '../../stores/authStore';
import { userStoreContext } from '../../stores/userStore';
import UserCard from './UserCard';

const JWTComponent = () => {
  const authStore = useContext(authStoreContext);
  const userStore = useContext(userStoreContext);
  const { users } = userStore;
  const loginWithDefaultCredentials = () => {
    authStore.login('p7chkn@yandex.ru', 'OlegTheBest2022');
  };

  useEffect(() => {
    authStore.logout();
  }, [authStore]);

  return (
    <View style={styles.wrap}>
      <SimpleButton
        title='Послать стандартные логин и пароль'
        onPress={loginWithDefaultCredentials}
      />
      <SimpleButton
        title='Получить юзера'
        onPress={userStore.fetchAllUsers}
        btnStyle={{ marginTop: 10 }}
      />
      <SimpleButton
        title='Очистить юзеров'
        onPress={userStore.clearUsers}
        btnStyle={{ marginTop: 10 }}
      />
      <ScrollView>
        {users.map((el) => (
          <UserCard user={el} />
        ))}
      </ScrollView>
    </View>
  );
};

export default observer(JWTComponent);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
