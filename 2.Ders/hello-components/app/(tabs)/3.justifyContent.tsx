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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mySafeArea: {
    flexDirection: "row",
    // Aralara boşluk ekler
    // justifyContent: "space-between",
    // Etrafına boşluk eklemek için
    justifyContent: "space-around",
  },
  myBox: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
  },
});

export default Index;
