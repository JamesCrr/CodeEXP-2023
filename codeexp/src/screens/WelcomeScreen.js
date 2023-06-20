import * as React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  console.log("in WelcomeScreen");
  return (
    <View style={styles.welcomeScreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/welcomeScreen.jpeg")}
      />
      <View style={styles.questTasklogo}>
        <Text
          style={[
            styles.bottom,
            styles.topTypo,
            { fontFamily: "Montserrat-SemiBold" },
          ]}
        >
          buddies
        </Text>
        <Text
          style={[
            styles.top,
            styles.topTypo,
            { fontFamily: "Montserrat-SemiBold" },
          ]}
        >
          work
        </Text>
      </View>
      <Pressable
        fontFamily="Inter-SemiBold"
        style={styles.buttonprimary}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text style={styles.continue}>Login as User</Text>
      </Pressable>
      <Pressable
        style={styles.managerLoginButton}
        onPress={() => navigation.navigate("ManagerLogin")}
      >
        <Text style={styles.continue}>Login as Admin</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  topTypo: {
    textAlign: "left",
    color: Color.base,
    width: "99.63%",
    position: "absolute",
  },
  bgIcon: {
    top: 0,
    left: 0,
    width: 686,
    position: "absolute",
    height: 932,
  },
  bottom: {
    top: "53.76%",
    left: "0.37%",
    letterSpacing: -1.9,
    fontWeight: "500",
    fontSize: 64,
    lineHeight: 64,
    paddingTop: 50,
  },
  top: {
    top: "0%",
    left: "0%",
    fontWeight: "600",
    fontSize: 64,
    lineHeight: 64,
  },
  questTasklogo: {
    top: 260,
    left: 80,
    width: 272,
    position: "absolute",
  },
  continue: {
    fontSize: FontSize.uI16Semi_size,
    fontWeight: "600",
    color: Color.white,
    textAlign: "center",
  },
  buttonprimary: {
    right: 43,
    bottom: 295,
    left: 44,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.base,
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    alignItems: "center",
    position: "absolute",
  },
  managerLoginButton: {
    right: 43,
    bottom: 235,
    left: 44,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.base,
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    alignItems: "center",
    position: "absolute",
  },
  welcomeScreen: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default WelcomeScreen;
