import { ButtonComponent } from "../components/ButtonComponent";
import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  VStack,
  HStack,
  Center,
  Container,
  Heading,
  Text,
  Box,
  Pressable,
  Badge,
  Icon,
  Button,
  Spinner,
  Spacer,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../Firebase";
import { auth } from "../Firebase";

export default function ManagerDashboard({ navigation }) {
  const [name, setName] = useState("Name");
  const [faction, setFaction] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState(Array);
  const [numOfMember, setNoOfMembers] = useState(Array);
  const [refreshing, setRefreshing] = useState(false);

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
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Box
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
            shadow={2}
            safeArea
          >
            <VStack bg="primary.500" space={4} alignItems="center">
              <HStack pt={2} pr={2}>
                <Heading color="white" fontSize={18} left={150}>
                  Dashboard
                </Heading>
                <Spacer />
                <Pressable
                  onPress={() => {
                    console.log("Log out");
                    navigation.replace("ManagerLogin");
                  }}
                >
                  <Ionicons name="log-out" size={24} color="white" />
                </Pressable>
              </HStack>
              <Heading color="white" fontSize="5xl">
                {faction.toUpperCase()}
              </Heading>
              <Badge
                borderRadius={"xl"}
                width={"150"}
                bg={"warmGray.50"}
                height={"50"}
              >
                <Text numberOfLines={1} color={"black"}>
                  {numOfMember} Members{" "}
                  <Icon as={AntDesign} name="user" size="md" />
                </Text>
              </Badge>

              <Heading color={"white"} fontSize={"4xl"} pt="3" pb={10}>
                {currency} CURRENCY
              </Heading>
            </VStack>
            <VStack space={8} p="6" alignItems="center">
              <Button
                width="80"
                rounded={"80"}
                rightIcon={
                  <Icon as={MaterialIcons} name="leaderboard" size="sm" />
                }
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
              </Button>
            </VStack>
            ;
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <HStack
        space={2}
        justifyContent="center"
        height={"100%"}
        alignItems={"center"}
      >
        <Spinner accessibilityLabel="Loading posts" size={"lg"} />
        <Text
          color="primary.500"
          fontSize="md"
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Loading
        </Text>
      </HStack>
    );
  }
}
