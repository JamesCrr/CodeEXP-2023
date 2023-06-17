import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { Image } from "react-native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  console.log("in WelcomeScreen");
  return (
    <View style={styles.welcomeScreen}>
      <Image
        style={styles.bgIcon}
        contentFit="cover"
        source={require("../../assets/welcomeScreen.jpeg")}
      />
      <View style={styles.questTasklogo}>
        <Text style={[styles.bottom, styles.topTypo]}>buddies</Text>
        <Text style={[styles.top, styles.topTypo]}>work</Text>
      </View>
      <Pressable
        style={styles.buttonprimary}
        onPress={() => navigation.navigate("LoginScreen1")}
      >
        <Text style={styles.continue}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  topTypo: {
    textAlign: "left",
    color: Color.base,
    fontSize: FontSize.size_45xl,
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
    height: "46.24%",
    top: "53.76%",
    left: "0.37%",
    letterSpacing: -1.9,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
  },
  top: {
    height: "47.31%",
    top: "0%",
    left: "0%",
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtrabold,
  },
  questTasklogo: {
    top: 260,
    left: 80,
    width: 272,
    height: 93,
    position: "absolute",
  },
  continue: {
    fontSize: FontSize.uI16Semi_size,
    fontWeight: "600",
    fontFamily: FontFamily.uI16Semi,
    color: Color.white,
    textAlign: "center",
  },
  buttonprimary: {
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
  iosLayoutIcon: {
    top: 11,
    left: 64,
    width: 328,
    height: 912,
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
