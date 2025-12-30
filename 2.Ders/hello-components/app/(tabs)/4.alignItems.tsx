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
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center", // Dikeyde ortalama sağlar
    // alignItems: "flex-end", // Dikeyde en sona hizzalar
    //alignItems: "flex-start", // Dikeyde en sona hizzalar
    flex: 1, // Ekranın tamamını height olarak kaplaması için
    backgroundColor: "red",
  },
  myBox: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
  },
});

export default Index;
