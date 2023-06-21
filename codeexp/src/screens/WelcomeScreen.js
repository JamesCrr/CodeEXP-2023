import * as React from "react";
// import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Text, Box, Button, Image, Center, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { ImageBackground } from "react-native";

const Logo = require("../../assets/Logo.png");
const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center" }}
      source={require("../../assets/welcomeScreen.jpeg")}
      resizeMode="cover"
    >
      <Box safeArea width={"100%"} height={"100%"}>
        {/* <View marginLeft={20} marginTop={20}>
          <Text lineHeight={18} fontSize={"lg"} fontFamily={"Montserrat-SemiBold"}>
            work{"\n"}
            <Text borderWidth={1} lineHeight={14} fontSize={"lg"} fontFamily={"Montserrat-SemiBold"}>
              buddies
            </Text>
          </Text>
        </View> */}
        <Center marginTop={10}>
          <Image source={Logo} size={260} resizeMode={"contain"} alt="Logo" />
          <VStack marginTop={10} space={10}>
            <Button borderRadius={30} onPress={() => navigation.navigate("LoginPage")}>
              <Text
                fontSize={"md"}
                paddingX={65}
                textAlign={"center"}
                fontFamily={"Inter-SemiBold"}
                color={"white"}
              >
                User Login
              </Text>
            </Button>
            <Button borderRadius={30} onPress={() => navigation.navigate("ManagerLogin")}>
              <Text fontSize={"md"} paddingX={65} fontFamily={"Inter-SemiBold"} color={"white"}>
                Admin Login
              </Text>
            </Button>
          </VStack>
        </Center>
      </Box>

      {/* <View style={styles.questTasklogo}>
        <Text
          style={[styles.bottom, styles.topTypo, { fontFamily: "Montserrat-SemiBold" }]}
          numberOfLines={1}
        >
          buddies
        </Text>
        <Text style={[styles.top, styles.topTypo, { fontFamily: "Montserrat-SemiBold" }]}>work</Text>
      </View>
      <Pressable
        fontFamily="Inter-SemiBold"
        style={styles.buttonprimary}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text style={styles.continue}>Login as User</Text>
      </Pressable>
      <Pressable style={styles.managerLoginButton} onPress={() => navigation.navigate("ManagerLogin")}>
        <Text style={styles.continue}>Login as Admin</Text>
      </Pressable> */}
    </ImageBackground>
  );
};

// const styles = StyleSheet.create({
//   topTypo: {
//     textAlign: "left",
//     color: Color.base,
//     width: "100%",
//     position: "absolute",
//     left: -10,
//   },
//   bgIcon: {
//     top: 0,
//     left: 0,
//     width: 686,
//     position: "absolute",
//     height: 932,
//   },
//   bottom: {
//     top: "53.76%",
//     left: "0.37%",
//     letterSpacing: -3.5,
//     fontWeight: "500",
//     fontSize: 64,
//     lineHeight: 64,
//     paddingTop: 50,
//   },
//   top: {
//     top: "0%",
//     left: "0%",
//     fontWeight: "500",
//     fontSize: 64,
//     lineHeight: 64,
//   },
//   questTasklogo: {
//     top: 260,
//     left: 80,
//     width: 272,
//     position: "absolute",
//   },
//   continue: {
//     fontSize: FontSize.uI16Semi_size,
//     fontWeight: "600",
//     color: Color.white,
//     textAlign: "center",
//   },
//   buttonprimary: {
//     right: 43,
//     bottom: 295,
//     left: 44,
//     borderRadius: Border.br_81xl,
//     backgroundColor: Color.base,
//     paddingHorizontal: Padding.p_13xl,
//     paddingVertical: Padding.p_base,
//     alignItems: "center",
//     position: "absolute",
//   },
//   managerLoginButton: {
//     right: 43,
//     bottom: 235,
//     left: 44,
//     borderRadius: Border.br_81xl,
//     backgroundColor: Color.base,
//     paddingHorizontal: Padding.p_13xl,
//     paddingVertical: Padding.p_base,
//     alignItems: "center",
//     position: "absolute",
//   },
//   welcomeScreen: {
//     backgroundColor: Color.white,
//     flex: 1,
//     width: "100%",
//     overflow: "hidden",
//     height: 932,
//   },
// });

export default WelcomeScreen;
