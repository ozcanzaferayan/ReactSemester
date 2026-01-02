// rnfe

import React, { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [isVisible, setIsVisible] = useState(false);

  const handleVisiblity = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView>
      <Button title="Göster/Gizle" onPress={handleVisiblity} />
      {isVisible && <Text>Çok gizli metin</Text>}
    </SafeAreaView>
  );
};

export default Index;
