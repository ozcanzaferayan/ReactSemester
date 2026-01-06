import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View } from 'react-native';

const index = () => {
  return (
    <View className="m-4 items-center justify-center self-center rounded-full bg-orange-500 p-16">
      <Feather name="alert-triangle" size={96} color={'#7c2d12'} />
    </View>
  );
};

export default index;
