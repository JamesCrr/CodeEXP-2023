import { ButtonComponent } from "../components/ButtonComponent";
import React, { useState, useEffect } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { VStack, HStack, Heading, Text, Box, Pressable, Badge, Icon, Spinner, useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { collection, query, where, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase";
import { auth } from "../Firebase";

const buttonWidth = 145;
export default function ManagerDashboard({ navigation }) {
  const [name, setName] = useState("Name");
  const [faction, setFaction] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState(Array);
  const [numOfMember, setNoOfMembers] = useState(Array);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const [currency, setCurrency] = useState(0);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
  });

  useEffect(() => {
    const Auth = auth;
    async function managerData() {
      const docRef = doc(firestore, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFaction(docSnap.data().faction);
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
      const docRef2 = doc(firestore, "factions", docSnap.data().faction);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        console.log("Document data:", docSnap2.data());
        setMembers(docSnap2.data().members);
        setCurrency(docSnap2.data().currency);
      } else {
        // / docSnap.data() will be undefined in this case */;
        console.log("No such document!");
      }
      setNoOfMembers(docSnap2.data().members.length);
      setLoaded(true);
    }
    managerData();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log("lol");
    }, 2000);
  }, []);
  if (loaded) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Box
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            color: "warmGray.50",
            letterSpacing: "lg",
          }}
          shadow={2}
          marginTop={2}
          flex={1}
          safeArea
        >
          <VStack space={4} alignItems="center">
            <HStack paddingTop={6} width={"100%"}>
              <Heading color="black" fontSize={24} flexGrow={1} paddingLeft={5} alignSelf={"center"}>
                Your Dashboard
              </Heading>
              <Pressable
                onPress={() => {
                  console.log("Log out");
                  navigation.replace("ManagerLogin");
                }}
                marginRight={2}
              >
                <Ionicons name="log-out" size={40} color={theme.colors.primary["400"]} />
              </Pressable>
            </HStack>
            <Box width={"90%"} bg={"primary.800"} borderRadius={20} padding={6} marginTop={"9%"} shadow={9}>
              <HStack justifyContent={"space-between"}>
                <Heading color="warmGray.200" fontSize="4xl" textAlign={"center"}>
                  {faction}
                </Heading>
                <Badge borderRadius={"xl"} bg={"warmGray.50"} alignSelf={"center"}>
                  <Text color={"black"} fontSize={"lg"} fontWeight={"bold"}>
                    {numOfMember} <Icon as={AntDesign} name="user" size="lg" />
                  </Text>
                </Badge>
              </HStack>
              {/* <Divider marginY={5} thickness={3} bg={"amber.400"} /> */}
              <Text
                color={"white"}
                fontSize={"4xl"}
                fontWeight={"bold"}
                textAlign={"center"}
                // borderWidth={3}
                borderTopWidth={2}
                borderBottomWidth={2}
                borderColor={"amber.200"}
                borderRadius={20}
                marginTop={10}
              >
                {currency} <Text fontSize={"md"}>Points</Text>
              </Text>
            </Box>
          </VStack>

          {/* Button Groups */}
          <VStack
            space={7}
            alignItems="center"
            alignContent={"center"}
            flexGrow={1}
            justifyContent={"center"}
          >
            {/* <ButtonComponent
            navigation={navigation}
            name="Create User"
            screen="CreateUser"
          ></ButtonComponent> */}

            <Heading fontSize={"lg"}>Actions</Heading>

            <HStack space={7}>
              <Pressable
                borderRadius={10}
                bg={"primary.400"}
                padding={5}
                justifyContent={"center"}
                width={buttonWidth}
                maxWidth={buttonWidth}
                onPress={() => navigation.navigate("FactionLeaderboard")}
                shadow={3}
              >
                <Icon
                  as={MaterialIcons}
                  name="leaderboard"
                  size="5xl"
                  alignSelf={"center"}
                  color={"warmGray.100"}
                />
                <Text color={"white"} marginTop={2} textAlign={"center"} fontSize={"md"} fontWeight={"bold"}>
                  Leaderboard
                </Text>
              </Pressable>

              <Pressable
                borderRadius={10}
                bg={"primary.400"}
                padding={5}
                justifyContent={"center"}
                width={buttonWidth}
                maxWidth={buttonWidth}
                onPress={() => navigation.navigate("CreateQuest")}
                shadow={3}
              >
                <Icon as={Ionicons} name="create" size="5xl" alignSelf={"center"} color={"warmGray.100"} />
                <Text color={"white"} marginTop={2} textAlign={"center"} fontSize={"md"} fontWeight={"bold"}>
                  Create Quest
                </Text>
              </Pressable>
            </HStack>

            <HStack space={7}>
              <Pressable
                borderRadius={10}
                bg={"primary.400"}
                padding={6}
                justifyContent={"center"}
                width={buttonWidth}
                maxWidth={buttonWidth}
                onPress={() => navigation.navigate("ManagerViewQuest")}
                shadow={3}
              >
                <Icon as={Entypo} name="list" size="5xl" alignSelf={"center"} color={"warmGray.100"} />
                <Text color={"white"} marginTop={2} textAlign={"center"} fontSize={"md"} fontWeight={"bold"}>
                  View Quest
                </Text>
              </Pressable>

              <Pressable
                borderRadius={10}
                bg={"primary.400"}
                padding={3}
                justifyContent={"center"}
                width={buttonWidth}
                maxWidth={buttonWidth}
                onPress={() => navigation.navigate("CreateUser")}
                shadow={3}
              >
                <Icon as={AntDesign} name="user" size="5xl" alignSelf={"center"} color={"warmGray.100"} />
                <Text color={"white"} marginTop={2} textAlign={"center"} fontSize={15} fontWeight={"bold"}>
                  Create Employee Account
                </Text>
              </Pressable>
            </HStack>

            {/* <Button
            width="80"
            rounded={"80"}
            rightIcon={<Icon as={MaterialIcons} name="leaderboard" size="sm" />}
            onPress={() => navigation.navigate("FactionLeaderboard")}
          >
            View Leaderboard
          </Button>
          <Button
            width="80"
            rounded={"80"}
            rightIcon={<Icon as={Ionicons} name="create" size="sm" />}
            onPress={() => navigation.navigate("CreateQuest")}
          >
            Create Quest
          </Button>
          <Button
            width="80"
            rounded={"80"}
            rightIcon={<Icon as={Entypo} name="list" size="sm" />}
            onPress={() => navigation.navigate("ManagerViewQuest")}
          >
            View Quest
          </Button>
          <Button
            width="80"
            rounded={"80"}
            rightIcon={<Icon as={AntDesign} name="user" size="sm" />}
            onPress={() => navigation.navigate("CreateUser")}
          >
            Create Employee Account
          </Button> */}
          </VStack>
        </Box>
      </ScrollView>
    );
  } else {
    return (
      <HStack space={2} justifyContent="center" height={"100%"} alignItems={"center"}>
        <Spinner accessibilityLabel="Loading posts" size={"lg"} />
        <Text color="primary.500" fontSize="md" textAlign={"center"} fontWeight={"bold"}>
          Loading
        </Text>
      </HStack>
    );
  }
}
