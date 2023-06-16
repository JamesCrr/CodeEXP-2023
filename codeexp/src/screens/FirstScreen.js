import { Box } from "native-base";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';


const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    // <View style={styles.container}>
    //   <Text>Your first text is here</Text>
    // </View>

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
    <Pressable onPress={() => console.log("hello world")}> Press me </Pressable>
    <Pressable onPress={() => navigation.navigate("WelcomeScreen")}> Press me </Pressable>
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
