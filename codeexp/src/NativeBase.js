import React from "react";
import { extendTheme } from "native-base";
import { useFonts } from "expo-font";

//   const [fontsLoaded] = useFonts({
//     'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
//     'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
//     'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
//     'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
//   });
export const LoadFonts = async()=>{ useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });
};
  export const theme = extendTheme({
    colors: {
            "background": {
                "50": "#11814d176",
                "100": "#114137152",
                "200": "#10e121130",
                "300": "#10510c111",
                "400": "#fbf7f4", //MAIN COLOR
                "500": "#f4ebe4",
                "600": "#ebded5",
                "700": "#e1d2c8",
                "800": "#d5c7bc",
                "900": "#c8bbb1",
            },
            "primary": {
                "50": "#ff10510a",
                "100": "#fff0e2",
                "200": "#ffdcbb",
                "300": "#fbc797",
                "400": "#fab26f", //MAIN COLOR
                "500": "#f4a75f",
                "600": "#ec9b4f",
                "700": "#e48f40",
                "800": "#d98332",
                "900": "#c7782d",
            },
            "socialQuests": {
                "50": "#117101118",
                "100": "#f3fef3",
                "200": "#d2f8d1",
                "300": "#b2f0b1",
                "400": "#90ea8f", //MAIN COLOR
                "500": "#82e181",
                "600": "#75d773",
                "700": "#68cc67",
                "800": "#5dc05c",
                "900": "#54b152",
            },
            "taskQuests": {
                "50": "#124111ff",
                "100": "#fcfeff",
                "200": "#d5eafe",
                "300": "#b1d7fa",
                "400": "#8dc5f8", //MAIN COLOR
                "500": "#7ab8f2",
                "600": "#6aaceb",
                "700": "#5ba1e2",
                "800": "#4d95d8",
                "900": "#4189cd"
            },
},
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
    fonts: {
        Logo: "Monsterrat-SemiBold",
        button: "Inter-SemiBold",
        body: "Inter-Regular",
        mono: "Inter-Medium",
    },

  });