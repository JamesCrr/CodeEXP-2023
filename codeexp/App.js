import "react-native-gesture-handler";
import { NativeBaseProvider, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/NativeBase";
import { useFonts } from "expo-font";
import { AppProvider } from "./src/AppProvider";
import FirstScreen from "./src/screens/FirstScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import PostCommentsScreen from "./src/screens/PostCommentsScreen";
import LoginPage from "./src/screens/LoginPage";
import RewardsScreen from "./src/screens/RewardsScreen";
import UserStack from "./src/screens/UserStack";

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
      <AppProvider>
        {/* React Navigation */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="PostCommentsScreen" component={PostCommentsScreen} />
            <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </NativeBaseProvider>
  );
}
