// rnfe
import React, { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [sayi, setSayi] = useState(42);

  const handleIncrement = () => {
    setSayi(sayi + 1);
  };

  const handleDecrement = () => {
    setSayi(sayi - 1);
  };

  return (
    <SafeAreaView>
      <Button title="Arttır" onPress={handleIncrement} />
      <Button title="Azalt" onPress={handleDecrement} />
      <Text>{sayi}</Text>
    </SafeAreaView>
  );
};

export default Index;
