import { Box, Pressable, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
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
        <Text>Press me</Text>
      </Pressable>
      <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 50 }}>borrow buddies</Text>
    </Box>
  );
};

export default FirstScreen;
