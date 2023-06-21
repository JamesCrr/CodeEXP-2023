import { firestore } from "../Firebase";
import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import {
  RefreshControl,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  ScrollView,
  SafeAreaView,
  StyleSheet
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
  // const onRefresh = (() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const goToCreatePostScreen = (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    console.log("item: " + item.questId);
    navigation.navigate("CreatePostScreen");
    dispatch({ type: "completedQuestId", val: item.questId });
  }

  const goToCompleteScreen = async (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    dispatch({ type: "completedQuestId", val: item.questId });
    alert("Quest Completed! Review sent to manager!");
    console.log("item: " + item.questId, "USER:",uid);
    //fetch data from firestore
    const userQuestRef = doc(firestore, "users", uid);
    const userQuestSnap = await getDoc(userQuestRef);

    if (userQuestSnap.exists()) {
      const quests = userQuestSnap.data().assignedQuest;
      quests.map((key) => {
        if (key.questId === item.questId) {
          key.completed = true;
        }
      });
      updateDoc(userQuestRef, {
        assignedQuest: quests,
      });
    }
    setRefreshing(!refreshing);
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
              if (questDescriptionSnap.data().duration === "weekly" && questDescriptionSnap.data().type !== "assigned") {
                questDescription.questId = val[1];
                weeklyQuests.push(questDescription);
                console.log(
                  "questDescriptionWEEKLY:",
                  questDescriptionSnap.data()
                );
                console.log("WEEKLY", weeklyQuests);
                // setUserWeeklyQuest(weeklyQuests);
              } else if (questDescriptionSnap.data().duration === "monthly" && questDescriptionSnap.data().type !== "assigned") {
                questDescription.questId = val[1];
                monthlyQuests.push(questDescription);
                console.log(
                  "questDescriptionMONTHLY:",
                  questDescriptionSnap.data()
                );
                console.log("MONTHLY:", monthlyQuests);
                // setUserMonthlyQuest(monthlyQuests);
              }
              else if(questDescriptionSnap.data().type === "assigned"){
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
  }, [refreshing]);

  console.log("HELLO");
  console.log("userWeeklyQuest HERE:", userWeeklyQuest);
  console.log("userMonthlyQuest HERE:", userMonthlyQuest);
  console.log("userWorkQuest HERE:", userWorkQuest);

  return (
    // <SafeAreaView >
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }>
    <ScrollView>
    <Box alignItems="center">
      <Heading fontSize="xl" pt="10">
        Work Quests
      </Heading>
      <FlatList
        data={userWorkQuest}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.currency}
                </Text>
                <Pressable onPress={() => goToCompleteScreen(item)}>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Perform Quest!
                  </Text>
                </Pressable>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              ></Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item, index) => index}
      />

      <Heading fontSize="xl" pt="10">
        Weekly Quests
      </Heading>
      <FlatList
        data={userWeeklyQuest}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.currency}
                </Text>
                <Pressable onPress={() => goToCreatePostScreen(item)}>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Perform Quest!
                  </Text>
                </Pressable>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              ></Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item, index) => index}
      />

      <Heading fontSize="xl" p="4" pb="3">
        Monthly Quests
      </Heading>
      {console.log("userMONTHLYQUEST:", userMonthlyQuest)}
      <FlatList
        data={userMonthlyQuest}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.currency}
                </Text>
                <Pressable onPress={() => goToCreatePostScreen(item)}>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Perform Quest!
                  </Text>
                </Pressable>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              ></Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item, index) => index}
      />
    </Box>
    </ScrollView>
  );
};

export default ViewQuests;

// export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//           <ViewQuests />
//       </Center>
//     </NativeBaseProvider>
//   );
// };
