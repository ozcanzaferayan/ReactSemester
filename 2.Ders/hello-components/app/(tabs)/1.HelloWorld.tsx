// rnfe

import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <Text style={styles.myText}>Hello World</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  myText: {
    color: "red",
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "Verdana",
  },
});

export default Index;
