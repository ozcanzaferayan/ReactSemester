// rnfe

import { View, Button } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Index = () => {
  const handlePress = () => {
    router.navigate('/detail');
  };

  return (
    <View>
      <Button title="Detaya Git" onPress={handlePress} />
    </View>
  );
};

export default Index;
