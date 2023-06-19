import "react-native-gesture-handler";
import { NativeBaseProvider, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/NativeBase";
import { useFonts } from "expo-font";
import { AppProvider } from "./src/AppProvider";
import FirstScreen from "./src/screens/FirstScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import { Linking, StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login";
import CreateUser from "./src/screens/CreateUser";
import CreateQuest from "./src/screens/CreateQuest";

// console.log(theme);
const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded, fontsLoadingError] = useFonts({
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  // Wait for the fonts to load first
  if (!fontsLoaded) {
    console.log("Fonts not Loaded!");
    return null;
  } else if (fontsLoadingError) {
    console.log("Fonts Loading Error!");
    return null;
  }
  if (fontsLoaded) {
    console.log("Fonts Loaded!");
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="CreateQuest" component={CreateQuest} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
