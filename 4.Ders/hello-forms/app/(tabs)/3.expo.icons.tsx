// rnfes
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <Feather name="user" size={64} color="dodgerblue" />
      <Feather name="home" size={64} color="#002323" />
      <Feather name="heart" size={64} color="tomato" />
      <Feather name="search" size={64} color="black" />
      <Feather name="lock" size={64} color="mediumseagreen" />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
