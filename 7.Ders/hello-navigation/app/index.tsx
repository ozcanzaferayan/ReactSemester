import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View>
      <Link href={'/products'}>Ürünlere git</Link>
    </View>
  );
};

export default index;
