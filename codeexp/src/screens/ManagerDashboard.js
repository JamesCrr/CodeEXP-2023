import { ButtonComponent } from "../components/ButtonComponent";
import { useState, useEffect } from "react";

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
import { db } from "../Firebase";
import { auth } from "../Firebase";

export default function ManagerDashboard({ navigation }) {
  const [name, setName] = useState("Name");
  const [faction, setFaction] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState(Array);
  const [numOfMember, setNoOfMembers] = useState(Array);

  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    const Auth = auth;
    async function managerData() {
      const docRef = doc(db, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFaction(docSnap.data().faction);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      const docRef2 = doc(db, "factions", docSnap.data().faction);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        console.log("Document data:", docSnap2.data());
        setMembers(docSnap2.data().members);
        setCurrency(docSnap2.data().currency);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setNoOfMembers(members.length);
      setLoaded(true);
    }
    managerData();
  }, []);
  if (loaded) {
    return (
      <Box
        p="2"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          color: "warmGray.50",
          letterSpacing: "lg",
        }}
        shadow={2}
      >
        <VStack bg="primary.500" space={4} alignItems="center">
          <HStack space={2}>
            <Heading>Dashboard</Heading>
          </HStack>
          <Heading>{faction}</Heading>
          <Badge p="3">{numOfMember} Members</Badge>

          <Badge p="3">{currency} Currency</Badge>

          <ButtonComponent
            navigation={navigation}
            name="Create User"
            screen="CreateUser"
          ></ButtonComponent>
        </VStack>
        <VStack space={4} p="6" alignItems="center">
          <Button
            rightIcon={<Icon as={MaterialIcons} name="leaderboard" size="sm" />}
            onPress={() => navigation.navigate("FactionLeaderboard")}
          >
            View Leaderboard
          </Button>
          <Button
            rightIcon={<Icon as={Ionicons} name="create" size="sm" />}
            onPress={() => navigation.navigate("CreateQuest")}
          >
            Create Quest
          </Button>
          <Button rightIcon={<Icon as={Entypo} name="list" size="sm" />}>
            View Quest
          </Button>
          <Button rightIcon={<Icon as={AntDesign} name="team" size="sm" />}>
            Faction Management
          </Button>
          <Button rightIcon={<Icon as={AntDesign} name="user" size="sm" />}>
            Create Employee Account
          </Button>
        </VStack>
        ;
      </Box>
    );
  }
}
