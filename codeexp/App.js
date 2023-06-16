import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import FirstScreen from "./src/screens/FirstScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
