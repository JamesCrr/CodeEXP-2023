// ReturnButton.js

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReturnButton = ({ customStyle = {} }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.button, customStyle]}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>&lt;</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ReturnButton;
