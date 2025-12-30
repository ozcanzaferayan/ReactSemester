// rnfe

import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={styles.mySafeArea}>
      <View style={styles.myBox}></View>
      <View style={styles.myBox}></View>
      <View style={styles.myBox}></View>
      <View style={styles.myBox}></View>
      <View style={styles.myBox}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mySafeArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  myBox: {
    backgroundColor: "blue",
    width: 100,
    height: 100,
  },
});

export default Index;
