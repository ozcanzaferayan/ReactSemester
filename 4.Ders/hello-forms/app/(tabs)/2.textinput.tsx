// rnfes
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  // usss
  const [text, setText] = useState("Zafer");

  return (
    <SafeAreaView>
      <TextInput value={text} onChangeText={setText} style={styles.input} />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 16,
  },
});
