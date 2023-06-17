import { Box, Button } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const FirstScreen = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Text>Your first text is here</Text>
    // </View>
    <div>
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
        This is a Box
      </Box>
      <Button onPress={() => navigation.navigate("LoginScreen")}>
        click me
      </Button>
    </div>
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
