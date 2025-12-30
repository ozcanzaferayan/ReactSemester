// rnfes

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={styles.mySafeAreaView}>
      <TouchableOpacity style={styles.myButton}>
        <Text style={styles.myButtonText}>Bana Tıkla</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  mySafeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  myButton: {
    backgroundColor: "dodgerblue",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  myButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "semibold",
  },
});
