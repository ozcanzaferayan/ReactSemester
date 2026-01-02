// rnfe

import React, { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [sayilar, setSayilar] = useState([1, 2, 3]);

  const handleAddNumber = () => {
    const sayi = Math.floor(Math.random() * 100);
    setSayilar([...sayilar, sayi]);
  };

  return (
    <SafeAreaView>
      <Button title="Sayı ekle" onPress={handleAddNumber} />
      <Text>{sayilar.join(", ")}</Text>
    </SafeAreaView>
  );
};

export default Index;
