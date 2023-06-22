import { firestore } from "../Firebase";
import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import {
  RefreshControl,
  Box,
  Avatar,
  HStack,
  VStack,
  Text,
  FlatList,
  Spacer,
  Center,
  NativeBaseProvider,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Button,
  Heading,
} from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { set } from "firebase/database";

const ViewQuests = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatchContext();
  const [userWeeklyQuest, setUserWeeklyQuest] = useState([]);
  const [userMonthlyQuest, setUserMonthlyQuest] = useState([]);
  const [userWorkQuest, setUserWorkQuest] = useState([]);
  const { userInfo } = useAppContext();
  const uid = userInfo.uid;
  let uncompletedQuests = [];
  let weeklyQuests = [];
  let monthlyQuests = [];
  let workQuests = [];

  const [refreshing, setRefreshing] = useState(false);

  const goToCreatePostScreen = (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    console.log("item: " + item.questId);
    navigation.navigate("CreatePostScreen");
    dispatch({ type: "completedQuestId", val: item.questId });
  };

  const goToCompleteScreen = async (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    // dispatch({ type: "completedQuestId", val: item.questId });
    // alert("Quest Completed! Review sent to manager!");
    // console.log("item: " + item.questId, "USER:", uid);
    // //fetch data from firestore
    // const userQuestRef = doc(firestore, "users", uid);
    // const userQuestSnap = await getDoc(userQuestRef);

    // if (userQuestSnap.exists()) {
    //   const quests = userQuestSnap.data().assignedQuest;
    //   quests.map((key) => {
    //     if (key.questId === item.questId) {
    //       key.completed = true;
    //     }
    //   });
    //   updateDoc(userQuestRef, {
    //     assignedQuest: quests,
    //   });
    // }
    // setRefreshing(!refreshing);
    alert("Review sent to manager!");
  };

  const displayQuests = async () => {
    const userQuestRef = doc(firestore, "users", uid);
    const userQuestSnap = await getDoc(userQuestRef);
    console.log("userQuestSnap:", userQuestSnap.data());
    if (userQuestSnap.exists()) {
      console.log("userQuestSnap:", userQuestSnap.data().assignedQuest);
      const quests = userQuestSnap.data().assignedQuest;
      console.log("quests:", quests);
      quests.map((key) => {
        console.log("key:", key.completed);
        if (key.completed === false) {
          uncompletedQuests.push(key.questId);
        }
      });
      console.log("uncompletedQuests:", uncompletedQuests);
      const uncompletedQuestsList = Object.entries(uncompletedQuests);
      console.log("questsList:", uncompletedQuestsList);
      await Promise.all(
        uncompletedQuestsList.map(async (val, index) => {
          console.log("uncompletedQuestLists KEY", val[0]);
          console.log("uncompletedQuestLists QUEST", val[1]);
          const questDescriptionRef = doc(firestore, "quests", val[1]);
          await getDoc(questDescriptionRef).then((questDescriptionSnap) => {
            console.log("HELLLLOOOOOO", questDescriptionSnap.data());
            if (questDescriptionSnap.exists()) {
              const questDescription = questDescriptionSnap.data();
              if (
                questDescriptionSnap.data().duration === "weekly" &&
                questDescriptionSnap.data().type !== "assigned"
              ) {
                questDescription.questId = val[1];
                weeklyQuests.push(questDescription);
                console.log("questDescriptionWEEKLY:", questDescriptionSnap.data());
                console.log("WEEKLY", weeklyQuests);
                /* setUserWeeklyQuest(weeklyQuests); */
              } else if (
                questDescriptionSnap.data().duration === "monthly" &&
                questDescriptionSnap.data().type !== "assigned"
              ) {
                questDescription.questId = val[1];
                monthlyQuests.push(questDescription);
                console.log("questDescriptionMONTHLY:", questDescriptionSnap.data());
                console.log("MONTHLY:", monthlyQuests);
                /* setUserMonthlyQuest(monthlyQuests); */
              } else if (questDescriptionSnap.data().type === "assigned") {
                questDescription.questId = val[1];
                workQuests.push(questDescription);
                console.log("questDescriptionWORK:", questDescriptionSnap.data());
                console.log("WORK:", workQuests);
              }
            }
          });
        })
      );
    } else {
      console.log("No such document!");
    }
    return [weeklyQuests, monthlyQuests, workQuests];
  };

  useEffect(() => {
    console.log("ViewQuests.js useEffect called");
    displayQuests().then((fetchedData) => {
      console.log("fetchedData:", fetchedData);
      console.log("fetchedData[0]:", fetchedData[0]);
      console.log("fetchedData[1]:", fetchedData[1]);
      setUserWeeklyQuest(fetchedData[0]);
      setUserMonthlyQuest(fetchedData[1]);
      setUserWorkQuest(fetchedData[2]);
    });
  }, [refreshing]);

  console.log("HELLO");
  console.log("userWeeklyQuest HERE:", userWeeklyQuest);
  console.log("userMonthlyQuest HERE:", userMonthlyQuest);
  console.log("userWorkQuest HERE:", userWorkQuest);

  return (
    <ScrollView>
      <Box alignItems="center" w={"100%"}>
        <Heading fontSize="3xl" pt="10" color="black">
          Work Quests
        </Heading>
        <FlatList
          width={"100%"}
          data={userWorkQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="primary.300"
                rounded="10"
                minHeight={60}
                p={5}
                width={"92%"}
                mb={5}
                alignSelf={"center"}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text color="coolGray.600" fontSize="15">
                    Earn {item.currency} Points
                  </Text>
                </VStack>
                <Text left="5" pr={5}>
                  {item.details}
                </Text>
                <Button
                  bg="primary.400"
                  mt={5}
                  rounded="full"
                  width={"auto"}
                  alignSelf={"flex-end"}
                  onPress={() => goToCompleteScreen(item)}
                >
                  Verify Quest!
                </Button>
              </Box>

              {/* Perform Quest Button */}
            </VStack>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Heading fontSize="3xl" pt="10" color="black">
          Weekly Quests
        </Heading>
        <FlatList
          width={"100%"}
          data={userWeeklyQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="socialQuests.300"
                rounded="10"
                minHeight={60}
                p={5}
                width={"92%"}
                mb={5}
                alignSelf={"center"}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text color="coolGray.600" fontSize="15">
                    Earn {item.currency} Points
                  </Text>
                </VStack>
                <Text fontSize="xs" left="5" pr={5}>
                  {item.description}
                </Text>
                <Button
                  bg="socialQuests.400"
                  mt={5}
                  rounded="full"
                  width={"auto"}
                  alignSelf={"flex-end"}
                  onPress={() => goToCreatePostScreen(item)}
                >
                  Perform Quest!
                </Button>
              </Box>

              {/* Perform Quest Button */}
            </VStack>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Heading fontSize="3xl" pt="10" color="black">
          Monthly Quests
        </Heading>
        <FlatList
          width={"100%"}
          data={userMonthlyQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="taskQuests.300"
                rounded="10"
                minHeight={60}
                p={5}
                width={"92%"}
                mb={5}
                alignSelf={"center"}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text color="coolGray.600" fontSize="15">
                    Earn {item.currency} Points
                  </Text>
                </VStack>
                <Text fontSize="xs" left="5" pr={5}>
                  {item.description}
                </Text>
                <Button
                  bg="taskQuests.400"
                  mt={5}
                  rounded="full"
                  width={"auto"}
                  alignSelf={"flex-end"}
                  onPress={() => goToCreatePostScreen(item)}
                >
                  Perform Quest!
                </Button>
              </Box>

              {/* Perform Quest Button */}
            </VStack>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </ScrollView>
  );
};

export default ViewQuests;

/* export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//           <ViewQuests />
//       </Center>
//     </NativeBaseProvider>
//   );
};*/
