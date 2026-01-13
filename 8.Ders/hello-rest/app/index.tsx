// rnfe

import { API_URL } from '@/src/constants/constants';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

export type User = {
  id: string;
  name: string;
};

const Index = () => {
  // usss
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = () => {
    fetch(API_URL + '/users')
      .then((res) => res.json())
      .then((json) => setUsers(json));
  };

  // Ekrana geri dönüldüğünde çağrılır
  useFocusEffect(
    useCallback(() => {
      console.log('[useFocusEffect]');
      getUsers();
    }, [])
  );

  return (
    <View>
      <Link href="/users/add" asChild>
        <Button title="Add User" />
      </Link>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item: user }) => (
          <Link href={`/users/${user.id}`}>
            <Text className="text-2xl underline">{user.name}</Text>
          </Link>
        )}
      />
    </View>
  );
};

export default Index;
