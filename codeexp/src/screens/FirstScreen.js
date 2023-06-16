import { Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from 'native-base';
import { theme } from "../NativeBase";
import { useFonts } from "expo-font";

const FirstScreen = () => {

    const [fontsLoaded] = useFonts({
    'Montserrat':require('../../assets/fonts/Montserrat-SemiBold.ttf'),

  });
  console.log(theme);
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
      This is a Box
<Text style={{ fontFamily: 'Montserrat', fontSize: 60 }}>borrow buddies</Text>
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
