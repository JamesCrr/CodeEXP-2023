import { Box, HStack, Image, Pressable, Text, View } from "native-base";
import { useState } from "react";

const UserAccountScreen = ({ navigation }) => {
  const [profileTabSelected, setProfileTabSelected] = useState(true);

  return (
    <Box marginTop={4} marginX={2} flex={1}>
      {/* Header Section */}
      <HStack justifyContent={"space-between"}>
        <Pressable
          borderWidth={1}
          onPress={() => {
            console.log("Edit Profile");
          }}
        >
          <Text>Edit Profile</Text>
        </Pressable>
        <Pressable
          borderWidth={1}
          onPress={() => {
            console.log("Log out");
            navigation.replace("LoginPage");
          }}
        >
          <Text>Log out</Text>
        </Pressable>
      </HStack>
      {/* Top Section */}
      <Box>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Profile Picture"
          size={150}
          borderRadius={100}
          alignSelf={"center"}
        />
        <Pressable
          marginLeft={"auto"}
          marginRight={3}
          borderWidth={1}
          onPress={() => {
            console.log("Redeem Currency");
            navigation.navigate("RewardsScreen");
          }}
        >
          <Text>Redeem Currency</Text>
        </Pressable>
        <Text textAlign={"center"}>Name</Text>
        <Text textAlign={"center"}>Tag | @Username</Text>
      </Box>

      {/* Middle Section */}
      <Box marginTop={7}>
        <Text>Recent Achievements</Text>
        <HStack space={2}>
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Achievement Badge"
            size={"sm"}
          />
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Achievement Badge"
            size={"sm"}
          />
        </HStack>
      </Box>

      {/* Bottom Section */}
      <Box marginTop={8} flexGrow={1}>
        <HStack space={2} justifyContent={"center"}>
          <Pressable onPress={() => setProfileTabSelected(true)} borderWidth={1}>
            <Text>Profile</Text>
          </Pressable>
          <Pressable onPress={() => setProfileTabSelected(false)} borderWidth={1}>
            <Text>History</Text>
          </Pressable>
        </HStack>
        <Box flexGrow={1} borderWidth={2} borderColor={"red.800"}>
          {profileTabSelected ? <Text>About ME</Text> : <Text>History</Text>}
        </Box>
      </Box>
    </Box>
  );
};
export default UserAccountScreen;
