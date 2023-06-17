import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button } from "native-base";
import { useFonts } from "expo-font";

const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    <Box
      p="2"
      bg="primary.500"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      shadow={2}
    >
      <Pressable onPress={() => console.log("hello world")}>
        {" "}
        Press me{" "}
      </Pressable>
      <Pressable onPress={() => navigation.navigate("WelcomeScreen")}>
        {" "}
        Press me{" "}
      </Pressable>
      This is a Box
      <Text style={{ fontFamily: "body", fontSize: 60 }}>borrow buddies</Text>
      <Button onPress={() => navigation.navigate("LoginScreen")}>
        Admin login
      </Button>
    </Box>
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
