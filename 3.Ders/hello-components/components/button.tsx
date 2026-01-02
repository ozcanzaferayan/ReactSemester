// rnfes

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  type?: "primary" | "secondary" | "success";
};

const Button = ({ title, type }: Props) => {
  let backgroundColor = "dodgerblue";
  switch (type) {
    case "primary":
      backgroundColor = "dodgerblue";
      break;
    case "secondary":
      backgroundColor = "gray";
      break;
    case "success":
      backgroundColor = "mediumseagreen";
      break;
    default:
      backgroundColor = "dodgerblue";
      break;
  }

  return (
    // Array syntax
    // <TouchableOpacity style={[styles.button, { backgroundColor }]}>
    // Spread stynax
    <TouchableOpacity style={{...styles.button, backgroundColor }}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "dodgerblue",
    padding: 16,
    borderRadius: 16,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
