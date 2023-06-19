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
        <Text> Press me</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("WelcomeScreen")}>
        <Text>Press me</Text></Pressable>
        
        <Pressable onPress={() => navigation.navigate("LoginPage")}>
        <Text>go login</Text>
      </Pressable>
      <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 50 }}>
        borrow buddies
      </Text>
      <Button onPress={() => navigation.navigate("CreateQuest")}>
        admin login
      </Button>
    </Box>
  );
};

export default FirstScreen;
