import "react-native-gesture-handler";
import { NativeBaseProvider, useTheme } from "native-base";
import { theme } from "./src/NativeBase";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./src/screens/FirstScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import ViewPostsScreen from "./src/screens/ViewPostsScreen";
import PostCommentsScreen from "./src/screens/PostCommentsScreen";
import { AppProvider } from "./src/AppProvider";

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
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="ViewPostsScreen" component={ViewPostsScreen} />
            <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
            <Stack.Screen name="PostCommentsScreen" component={PostCommentsScreen} />
            {/* <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </NativeBaseProvider>
  );
}
