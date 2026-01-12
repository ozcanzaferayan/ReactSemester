import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Detail = () => {
  const { username } = useLocalSearchParams<{ username: string }>();

  return (
    <View>
      <Text className="text-6xl">{username}</Text>
    </View>
  );
};

export default Detail;
