import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View>
      <Link
        href={{
          pathname: '/detail',
          params: {
            username: 'zafer',
          },
        }}>
        Detaya git
      </Link>
    </View>
  );
};

export default index;
