import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { firestore } from "../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  Box,
  Badge,
  HStack,
  Input,
  Stack,
  TextArea,
  Pressable,
  Image,
  ScrollView,
  Text,
  Button,
  Icon,
  Container,
  Heading,
  Spinner,
  Center,
  Spacer,
} from "native-base";
import { QuestComponent } from "../components/questComponent";
import { update } from "firebase/database";
import ReturnButton from "../components/ReturnButton";

const ManageQuest = ({ route, navigation }) => {
  const Auth = auth;
  const [loaded, setLoaded] = useState(Array);
  const [quest, setQuest] = useState(route.params.questData);
  const [allMember, setAllMember] = useState(Array);
  const allMemberArray = [];

  useEffect(() => {
    async function AllUserData() {
      await Promise.all(
        route.params.questData.questMembers.map(async (member) => {
          const docRef2 = doc(firestore, "users", member);
          const docSnap2 = await getDoc(docRef2);
          allMemberArray.push(docSnap2.data().name);
        })
      );
      setAllMember(allMemberArray);
      setLoaded(true);
    }
    AllUserData();
  }, []);

  const completeQuest = async () => {
    const questRef = doc(firestore, "quests", quest.questId);
    await updateDoc(questRef, {
      completed: true,
    });
    const managerRef = doc(firestore, "managers", Auth.currentUser.uid);
    const ManagerSnap = await getDoc(managerRef);
    if (ManagerSnap.exists()) {
      console.log("Document data:", ManagerSnap.data());
      let ManagerQuest = ManagerSnap.data().assignedQuest;
      const filterManager = ManagerQuest.filter(
        (i) => i.questId != quest.questId
      );
      filterManager.push({ completed: true, questId: quest.questId });
      await updateDoc(managerRef, {
        assignedQuest: filterManager,
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    await Promise.all(
      quest.questMembers.map(async (member) => {
        const memberRef = doc(firestore, "users", member);
        getDoc(memberRef).then((memberSnap) => {
          let memberQuest = memberSnap.data().assignedQuest;
          const filterMember = memberQuest.filter(
            (i) => i.questId != quest.questId
          );
          filterMember.push({ completed: true, questId: quest.questId });
          updateDoc(memberRef, {
            assignedQuest: filterMember,
            currency: memberSnap.data().currency + quest.currency,
          }).then((value) => {
            console.log("done");
          });
        });
      })
    );
    const factionRef = doc(firestore, "factions", ManagerSnap.data().faction);
    const factionSnap = await getDoc(factionRef);
    const newpoints = quest.questMembers.length * quest.currency;
    await updateDoc(factionRef, {
      currency: factionSnap.data().currency + newpoints,
    });

    navigation.navigate("ManagerDashboard");
  };

  if (loaded) {
    return (
      <Box safeArea>
        <ReturnButton />
        <Center>
          <Container>
            <Heading fontSize={"2xl"}>
              Manage :<Text color="primary.400"> {quest.title}</Text>
            </Heading>
            <Text mt={3} fontWeight="medium">
              Deadline:
            </Text>
            <Text color="primary.800">{route.params.date}</Text>
            <Text mt={3} fontWeight="medium">
              Currency:
            </Text>
            <Text color="primary.800">{quest.currency}</Text>
            <Text></Text>
            <Text>Members: </Text>
            <>
              {allMember.map(function (member) {
                return (
                  <Text color="primary.800" key={member}>
                    {member}
                  </Text>
                );
              })}
            </>
            <Text></Text>
            <Input placeholder="Feedback" w="100%" height={200} />
            <Text></Text>
            <Button bg={"success.500"} onPress={completeQuest}>
              Complete Quest
            </Button>
          </Container>
        </Center>
      </Box>
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
};

export default ManageQuest;
