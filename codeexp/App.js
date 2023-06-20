import "react-native-gesture-handler";
import { theme } from "./src/NativeBase";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider } from "./src/AppProvider";
import FirstScreen from "./src/screens/FirstScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import ViewPostsScreen from "./src/screens/ViewPostsScreen";
import PostCommentsScreen from "./src/screens/PostCommentsScreen";
import LoginPage from "./src/screens/LoginPage";
import ViewQuests from "./src/screens/ViewQuests";
import UserStack from "./src/screens/UserStack";
import AchievementModal from "./src/components/AchievementModal";
import ProgressBarModal from "./src/components/ProgressBarModal";
import RewardsScreen from "./src/screens/RewardsScreen";
import ManagerLogin from "./src/screens/ManagerLogin";

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
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="ManagerLogin" component={ManagerLogin} />
            <Stack.Screen
              name="UserStack"
              component={UserStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ViewQuests" component={ViewQuests} />
            <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
            <Stack.Screen name="ViewPostsScreen" component={ViewPostsScreen} />
            <Stack.Screen
              name="CreatePostScreen"
              component={CreatePostScreen}
            />
            <Stack.Screen
              name="PostCommentsScreen"
              component={PostCommentsScreen}
            />
            {/* <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/> */}
          </Stack.Navigator>
        </NavigationContainer>
        <AchievementModal />
        <ProgressBarModal />
      </AppProvider>
    </NativeBaseProvider>
  );
}
