import { firestore } from "../Firebase";
import { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import {
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
} from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const ViewQuests = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatchContext();
  const [quests, setQuests] = useState([]);
  const [grabDataState, setGrabDataState] = useState(false);
  const { userInfo } = useAppContext();
  const [activeQuestsDesc, setActiveQuestsDesc] = useState([]);
  const uid = userInfo.uid;
  const weeklyQuests = [];
  const monthlyQuests = [];

  useEffect(() => {
    //Retrieve user's quests that are uncompleted, defined by the completed tag in the firestore
    const retrieveData = async () => {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      const uncompleted = [];
      if (docSnap.exists()) {
        const quests = docSnap.data().socialQuest;
        console.log("Document data:", docSnap.data().socialQuest);
        console.log(docSnap.data().socialQuest);
        setGrabDataState(true);
        quests.map((key) => {
          if (key.completed === false) {
            uncompleted.push(key);
          }
        });
        setQuests(uncompleted);
      } else {
        console.log("No such document!");
      }
    };
    retrieveData();
  }, [grabDataState]);

  useEffect(() => {
    quests.map((key) => {
      console.log(key.questsId);
      const retrieveQuests = async () => {
        const docRef = doc(firestore, "quests", key.questsId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const activeQuests = docSnap.data();
          console.log("key.questsId: " + key.questsId);
          const activeUserQuests = { ...activeQuests, id: key.questsId };
          console.log("Document data here:", docSnap.data());
          setActiveQuestsDesc((prevQuestsDesc) => [
            ...prevQuestsDesc,
            activeUserQuests,
          ]);
          console.log("Quests data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      retrieveQuests();
    });
  }, [grabDataState]);

  const goToCreatePostScreen = (item) => {
    console.log("item: " + Object.values(item), Object.keys(item));
    console.log("item: " + item.id);
    navigation.navigate("CreatePostScreen");
    dispatch({ type: "completedQuestId", val: item.id });
  };

  const manageActiveQuests = () => {
    console.log("NEW FUNCTION:", activeQuestsDesc);
    activeQuestsDesc.map((key) => {
      if (key.duration === "weekly") {
        weeklyQuests.push(key);
      }
      if (key.duration === "monthly") {
        console.log("KEY", key);
        monthlyQuests.push(key);
      }
    });
    console.log("WEEKLY QUESTS:", weeklyQuests);
    console.log("MONTHLY QUESTS:", monthlyQuests);
  };
  manageActiveQuests();

  if (loaded) {
    return (
      <Box alignItems="center">
        <Heading fontSize="xl" p="1">
          Weekly Quests
        </Heading>
        <FlatList
          data={weeklyQuests}
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
        <FlatList
          data={monthlyQuests}
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

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <ViewQuests />
      </Center>
    </NativeBaseProvider>
  );
};
