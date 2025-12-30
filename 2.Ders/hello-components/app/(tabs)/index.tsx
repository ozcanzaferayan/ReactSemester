// rnfes
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const black = "#141414";
const darkGray = "#1F1F1F";
const gray = "#333333";
const lemon = "#C3DB6C";
const white = "#FFFFFF";
const lightGray = "#999999";

const Index = () => {
  return (
    <SafeAreaView style={styles.mySafeAreaView}>
      <View style={styles.myCard}>
        <View style={styles.myPicture}></View>
        <Text style={styles.name}>Zafer AYAN</Text>
        <Text style={styles.location}>Istanbul, Kadikoy</Text>
        <Text style={styles.title}>Frontend Developer</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Github</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Frontend Mentor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  mySafeAreaView: {
    backgroundColor: black,
    flex: 1,
    padding: 32,
  },
  myCard: {
    flex: 1,
    backgroundColor: darkGray,
    borderRadius: 16,
    alignItems: "center",
    padding: 32,
  },
  myPicture: {
    backgroundColor: lightGray,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    color: white,
    fontSize: 32,
    marginTop: 16,
  },
  location: {
    color: lemon,
    marginTop: 8,
    fontSize: 18,
  },
  title: {
    color: lightGray,
    marginTop: 4,
  },
  button: {
    backgroundColor: gray,
    width: "100%",
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: white,
    fontSize: 16,
    fontWeight: "semibold",
  },
});
