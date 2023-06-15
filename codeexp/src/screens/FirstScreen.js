import { StyleSheet, Text, View } from "react-native";

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Your first text is here</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default FirstScreen;
