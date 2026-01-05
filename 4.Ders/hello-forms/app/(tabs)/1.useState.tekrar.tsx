// rnfes

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [sayi, setSayi] = useState(42);

  const handlePress = () => {
    setSayi(sayi + 1);
  };

  console.log("Rendered");

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>Click me</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 64 }}>{sayi}</Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "dodgerblue",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
});
