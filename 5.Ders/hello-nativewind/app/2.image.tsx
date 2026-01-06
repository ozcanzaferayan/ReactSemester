// rnfe
import React from 'react';
import { Image, View } from 'react-native';

const Index = () => {
  const url =
    'https://images.unsplash.com/photo-1765804015672-c5a0b61cb389?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <View>
      <Image source={require('../assets/icon.png')} className="h-24 w-24" />
      <Image source={{ uri: url }} className="h-48 w-48" resizeMode="cover" />
      <Image source={{ uri: url }} className="h-48 w-48" resizeMode="contain" />
      <Image source={{ uri: url }} className="h-48 w-48" resizeMode="repeat" />
      <Image source={{ uri: url }} className="h-48 w-48" resizeMode="center" />
    </View>
  );
};

export default Index;
