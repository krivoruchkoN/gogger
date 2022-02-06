import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { friendsStoreContext } from '../stores/friendsStore';

const FriendList = () => {
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
};

export default observer(FriendList);
