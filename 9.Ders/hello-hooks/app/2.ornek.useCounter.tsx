// rnfe

import { useCounter } from '@/src/hooks/useCounter';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Index = () => {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 42,
    step: 7,
  });

  // Arayüz
  return (
    <View>
      <Button title="Arttır" onPress={increment} />
      <Button title="Azalt" onPress={decrement} />
      <Button title="Reset" onPress={reset} />
      <Text className="text-6xl">{count}</Text>
    </View>
  );
};

export default Index;
