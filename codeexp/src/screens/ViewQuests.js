import { firestore } from "../Firebase";
import { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import {
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

  const goToCreatePostScreen = (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    console.log("item: " + item.questId);
    navigation.navigate("CreatePostScreen");
    dispatch({ type: "completedQuestId", val: item.questId });
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
                console.log(
                  "questDescriptionWEEKLY:",
                  questDescriptionSnap.data()
                );
                console.log("WEEKLY", weeklyQuests);
                /* setUserWeeklyQuest(weeklyQuests); */
              } else if (
                questDescriptionSnap.data().duration === "monthly" &&
                questDescriptionSnap.data().type !== "assigned"
              ) {
                questDescription.questId = val[1];
                monthlyQuests.push(questDescription);
                console.log(
                  "questDescriptionMONTHLY:",
                  questDescriptionSnap.data()
                );
                console.log("MONTHLY:", monthlyQuests);
                /* setUserMonthlyQuest(monthlyQuests); */
              } else if (questDescriptionSnap.data().type === "assigned") {
                questDescription.questId = val[1];
                workQuests.push(questDescription);
                console.log(
                  "questDescriptionWORK:",
                  questDescriptionSnap.data()
                );
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
  }, []);

  console.log("HELLO");
  console.log("userWeeklyQuest HERE:", userWeeklyQuest);
  console.log("userMonthlyQuest HERE:", userMonthlyQuest);
  console.log("userWorkQuest HERE:", userWorkQuest);

  return (
    <ScrollView>
      <Box alignItems="center">
        <Heading fontSize="3xl" pt="10" color="black">
          Work Quests
        </Heading>
        <FlatList
          data={userWorkQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="primary.300"
                rounded="full"
                minHeight={60}
                p={5}
                width={380}
                mb={5}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text fontSize="sm" bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text fontSize="xs" color="coolGray.600" fontSize="15">
                    {item.currency}
                  </Text>
                </VStack>
                <Text fontSize="xs" left="5" pr={5}>
                  {item.details}
                </Text>
                <Button
                  bg="primary.400"
                  mt={5}
                  rounded="full"
                  width={"40%"}
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
          Weekly Quests
        </Heading>
        <FlatList
          data={userWeeklyQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="socialQuests.300"
                rounded="full"
                minHeight={60}
                p={5}
                width={380}
                mb={5}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text fontSize="sm" bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text fontSize="xs" color="coolGray.600" fontSize="15">
                    {item.currency}
                  </Text>
                </VStack>
                <Text fontSize="xs" left="5" pr={5}>
                  {item.description}
                </Text>
                <Button
                  bg="socialQuests.400"
                  mt={5}
                  rounded="full"
                  width={"40%"}
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
          data={userMonthlyQuest}
          renderItem={({ item }) => (
            <VStack alignItems="flex-start">
              {/* Quest Title and Currency */}

              <Box
                bg="taskQuests.300"
                rounded="full"
                minHeight={60}
                p={5}
                width={380}
                mb={5}
              >
                <VStack alignItems="flex-start" left="5">
                  <Text fontSize="sm" bold fontSize="15">
                    {item.title}
                  </Text>
                  <Text fontSize="xs" color="coolGray.600" fontSize="15">
                    {item.currency}
                  </Text>
                </VStack>
                <Text fontSize="xs" left="5" pr={5}>
                  {item.description}
                </Text>
                <Button
                  bg="taskQuests.400"
                  mt={5}
                  rounded="full"
                  width={"40%"}
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
