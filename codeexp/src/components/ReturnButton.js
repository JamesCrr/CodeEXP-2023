import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";

const ReturnButton = ({ customStyle = {} }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: theme.colors.primary[500] }]}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>&lt;</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 20,
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
    color: "#fff",
  },
});

export default ReturnButton;
