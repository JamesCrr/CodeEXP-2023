import { firestore } from '../Firebase';
import { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { set } from 'firebase/database';

const ViewQuests = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatchContext();
    const [userWeeklyQuest,setUserWeeklyQuest] = useState([]);
    const [userMonthlyQuest,setUserMonthlyQuest] = useState([]);
    const { userInfo } = useAppContext();
    const uid = userInfo.uid;
    let uncompletedQuests = [];


useEffect(() => {
  console.log("ViewQuests.js useEffect called");
  const displayQuests = async () => {
    let weeklyQuests = [];
    let monthlyQuests = [];
    userQuestRef = doc(firestore, "users", uid);
    const userQuestSnap = await getDoc(userQuestRef);
    if (userQuestSnap.exists()) {
      console.log("userQuestSnap:", userQuestSnap.data().socialQuest);
      const quests = userQuestSnap.data().socialQuest;
      console.log("quests:", quests);
      quests.map((key) => {
        console.log("key:", key.completed);
        if(key.completed === false){
          uncompletedQuests.push(key.questsId);
        }
      });
      console.log("uncompletedQuests:", uncompletedQuests);
      const uncompletedQuestsList = Object.entries(uncompletedQuests);
      console.log("questsList:", uncompletedQuestsList);
      await Promise.all(uncompletedQuestsList.map(async (val,index) => {
        console.log("uncompletedQuestLists KEY",val[0]);
        console.log("uncompletedQuestLists QUEST",val[1]);
        questDescriptionRef = doc(firestore, "quests", val[1]);
        const questDescriptionSnap = await getDoc(questDescriptionRef);
        if (questDescriptionSnap.exists()) {
          console.log("questDescriptionSnap:", questDescriptionSnap.data());
          const questDescription = questDescriptionSnap.data();
          if (questDescription.duration === "weekly") {
            console.log("questDescriptionWEEKLY:", questDescription);
            weeklyQuests.push(questDescription);
          }
          else if (questDescription.duration === "monthly") {
            console.log("questDescriptionMONTHLY:", questDescription);
            monthlyQuests.push(questDescription);
          };
        };
        
      }));
      setUserWeeklyQuest(weeklyQuests);
      setUserMonthlyQuest(monthlyQuests);
      console.log("weeklyQuests:", weeklyQuests);
      console.log("monthlyQuests:", monthlyQuests);
  }
  else {
    console.log("No such document!");
  }
  // const allQuestsRef = collection(firestore, "quests");
  // const allQuestsSnap = await getDocs(allQuestsRef);
  // if (allQuestsSnap.exists()) {
  //   console.log("allQuestsSnap:", allQuestsSnap.data());
  //   const allQuests = allQuestsSnap.data();
  //   console.log("allQuests:", allQuests);
  // }
  // else {
  //   console.log("No such document!");
  // }

}
  displayQuests();
},[]);
//Retrieve user's quests that are uncompleted, defined by the completed tag in the firestore
// const retrieveData = async () => {
//     const docRef = doc(firestore, "users", uid);
//     const docSnap = await getDoc(docRef);
//     const uncompleted = [];
//     if (docSnap.exists()) {
//     const quests = docSnap.data().socialQuest;
//         console.log("Document data:", docSnap.data().socialQuest);
//         console.log(docSnap.data().socialQuest);
//         setGrabDataState(true);
//         quests.map((key) => {
//             if(key.completed === false){
//                 uncompleted.push(key);
//             }});
//         setQuests(uncompleted);
//     } else {
//       console.log("No such document!");
//     }
    
// };retrieveData()
// //manageActiveQuests() call after retrieveData() to ensure that the activeQuestsDesc is updated with the latest data
// // 

//     }, []);

// useEffect(() => {
// quests.map((key) => {
//     console.log(key.questsId);
//     const retrieveQuests = async () => {
//     const docRef = doc(firestore, "quests", key.questsId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//     const activeQuests = docSnap.data();
//     console.log("key.questsId: " + key.questsId);
//     const activeUserQuests = {...activeQuests, id:key.questsId};
//     console.log("Document data here:", docSnap.data());
//     setActiveQuestsDesc(prevQuestsDesc=>[...prevQuestsDesc,activeUserQuests]);
//       console.log("Quests data:", docSnap.data());

//     } else {
//       console.log("No such document!");
//     }
// }
// retrieveQuests();
// });
// },[grabDataState]);

// const goToCreatePostScreen = (item) => {
//   console.log("item: " + Object.values(item) ,Object.keys(item));
//     console.log("item: " + item.id);
// navigation.navigate("CreatePostScreen");
// dispatch({ type: "completedQuestId", val: item.id });
// };  

// const manageActiveQuests = () => {
//   console.log("NEW FUNCTION:", activeQuestsDesc);
//   activeQuestsDesc.map((key) => {
//   if(key.duration === "weekly"){

//     weeklyQuests.push(key);
//   }
//   if(key.duration === "monthly"){
//     console.log("KEY",key);
//     monthlyQuests.push(key);
//   }
// });
// console.log("WEEKLY QUESTS:", weeklyQuests);
// console.log("MONTHLY QUESTS:", monthlyQuests);
// };
// manageActiveQuests();
console.log("HELLO");
return <Box alignItems="center">
<Heading fontSize="xl" p="1">
  Weekly Quests
</Heading>
<FlatList data={userWeeklyQuest} renderItem={({
item
}) => <Box borderBottomWidth="1" _dark={{
borderColor: "muted.50"
}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
      <HStack space={[2, 3]} justifyContent="space-between">
        <VStack>

          <Text _dark={{
      color: "warmGray.50"
    }} color="coolGray.800" bold>
            {item.title}
          </Text>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
            {item.description}
          </Text>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
            {item.currency}
          </Text>
          <Pressable onPress={() => goToCreatePostScreen(item)}>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
        Perform Quest!</Text>
          </Pressable>
        </VStack>
        <Spacer />
        <Text fontSize="xs" _dark={{
    color: "warmGray.50"
  }} color="coolGray.800" alignSelf="flex-start">
        </Text>
      </HStack>
    </Box>} keyExtractor={(item,index )=> index} />

    <Heading fontSize="xl" p="4" pb="3">
  Monthly Quests
</Heading>
<FlatList data={userMonthlyQuest} renderItem={({
item
}) => <Box borderBottomWidth="1" _dark={{
borderColor: "muted.50"
}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
      <HStack space={[2, 3]} justifyContent="space-between">
        <VStack>

          <Text _dark={{
      color: "warmGray.50"
    }} color="coolGray.800" bold>
            {item.title}
          </Text>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
            {item.description}
          </Text>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
            {item.currency}
          </Text>
          <Pressable onPress={() => goToCreatePostScreen(item)}>
          <Text color="coolGray.600" _dark={{
      color: "warmGray.200"
    }}>
        Perform Quest!</Text>
          </Pressable>
        </VStack>
        <Spacer />
        <Text fontSize="xs" _dark={{
    color: "warmGray.50"
  }} color="coolGray.800" alignSelf="flex-start">
        </Text>
      </HStack>
    </Box>} keyExtractor={(item,index )=> index} />
</Box>;
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