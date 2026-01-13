import { API_URL } from '@/src/constants/constants';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { User } from '..';

const UserDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [user, setUser] = useState<User>();

  // uffs
  useEffect(() => {
    fetch(API_URL + '/users/' + id)
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return (
    <View>
      <Text className="text-2xl">ID: {user?.id}</Text>
      <Text className="text-2xl">name: {user?.name}</Text>
    </View>
  );
};

export default UserDetail;
