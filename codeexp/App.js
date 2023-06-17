import "react-native-gesture-handler";
import { NativeBaseProvider, useTheme } from "native-base";
import { theme } from "./src/NativeBase";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./src/screens/FirstScreen";
import { useState } from "react";

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded, fontsLoadingError] = useFonts({
    'Montserrat-SemiBold': require("./assets/fonts/Montserrat-SemiBold.ttf"),
    'Inter-Medium': require("./assets/fonts/Inter-Medium.ttf"),
    'Inter-Regular': require("./assets/fonts/Inter-Regular.ttf"),
    'Inter-SemiBold': require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  // console.log(theme);

  // Wait for the fonts to load first
  if (!fontsLoaded) {
    console.log("Fonts not Loaded!");
    return null;
  } else if (fontsLoadingError) {
    console.log("Fonts Loading Error!");
    return null;
  }
  if(fontsLoaded){
    console.log('here');
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
