import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const Home = () => {
  console.log('Component doğdu');

  useEffect(() => {
    console.log('Component yaşadı');

    return () => {
      console.log('Component öldü');
    };
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
