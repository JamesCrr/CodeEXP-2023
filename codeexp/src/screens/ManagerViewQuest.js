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
  VStack,
  Spinn,
  Flex,
} from "native-base";
import { QuestComponent } from "../components/questComponent";
import ReturnButton from "../components/ReturnButton";

const ManagerViewQuest = ({ navigation }) => {
  const Auth = auth;
  const [loaded, setLoaded] = useState(Array);
  const [numOfQuest, setNum] = useState(0);
  const [allQuestState, setAllQuest] = useState([]);
  const [filteredQuests, setFilteredQuests] = useState([]);

  const allQuestArray = [];

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredQuests(allQuestState);
    } else {
      const filtered = allQuestState.filter((quest) => {
        const isTitleMatch = quest.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const isMemberMatch = quest.questMembers.some((member) =>
          member.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return isTitleMatch || isMemberMatch;
      });
      setFilteredQuests(filtered);
    }
  };

  useEffect(() => {
    async function managerData() {
      const docRef = doc(firestore, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        var allQuest = docSnap.data().assignedQuest;
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
      await Promise.all(
        allQuest.map(async (item) => {
          const docRef2 = doc(firestore, "quests", item.questId);
          const docSnap2 = await getDoc(docRef2);
          /*   return docSnap2 */ const docdata = docSnap2.data();
          console.log(docSnap2.data(), "DOCSNAP");
          console.log(docdata, "DOCSNAP");
          docdata.questId = item.questId;
          console.log(docdata, "DOCSNAP");
          allQuestArray.push(docdata);
        })
      );
      console.log(allQuestArray, "allQuestArray");
      const notCompleted = allQuestArray.filter((i) => i.completed == false);
      console.log(notCompleted, "NOT");
      setNum(notCompleted.length);
      setAllQuest(allQuestArray);
      setLoaded(true);
      setFilteredQuests(
        allQuestArray
      ); /* Set the initial filteredQuests state */
    }
    managerData();
  }, []);
  if (loaded) {
    return (
      <Box>
        <HStack alignItems="center" left={2}>
          <Badge>
            <Text fontSize="5xl">{numOfQuest}</Text>
          </Badge>
          <VStack>
            <Text fontSize="xl">Active</Text>
            <Text fontSize="xl">Quests</Text>
          </VStack>
          <Flex flex={1} alignItems="flex-end" right={5}>
            <ReturnButton />
          </Flex>
        </HStack>
        <Input
          borderRadius={"full"}
          bg={"primary.500"}
          width={"80%"}
          alignSelf={"center"}
          placeholderTextColor={"white"}
          placeholder="Search Quest"
          onChangeText={(text) => handleSearch(text)}
        />
        <React.Fragment>
          {filteredQuests.map((quest) => {
            if (!quest.completed) {
              return (
                <QuestComponent
                  questData={quest}
                  navigation={navigation}
                  key={quest.questId}
                />
              );
            }
            return null; // Add this line to handle the case when the quest is completed
          })}
        </React.Fragment>
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
export default ManagerViewQuest;
