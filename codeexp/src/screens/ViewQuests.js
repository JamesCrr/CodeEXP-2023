import { firestore } from '../Firebase';
import { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const ViewQuests = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatchContext();
    const [quests, setQuests] = useState([]);
    const [grabDataState, setGrabDataState] = useState(false);
    const { uid } = useAppContext();
    const [activeQuestsDesc,setActiveQuestsDesc] = useState([]);
    console.log(uid);


useEffect(() => {

//Retrieve user's quests
const retrieveData = async () => {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    const quests = docSnap.data().socialQuest;
        console.log("Document data:", docSnap.data().socialQuest);
        console.log(docSnap.data().socialQuest);
        setGrabDataState(true);
        setQuests(quests);
    } else {
      console.log("No such document!");
    }
    
};retrieveData()
dispatch({ type: "allQuests", val:quests });;
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
    const activeUserQuests = {...activeQuests, id:key.questsId};
    console.log("Document data here:", docSnap.data());
    setActiveQuestsDesc(prevQuestsDesc=>[...prevQuestsDesc,activeUserQuests]);
      console.log("Quests data:", docSnap.data());

    } else {
      console.log("No such document!");
    }
}
retrieveQuests();
});
},[grabDataState]);

const goToCreatePostScreen = (item) => {
    console.log("item: " + item);
navigation.navigate("CreatePostScreen");
dispatch({ type: "completedQuestId", val: item });
};

return <Box>
<Heading fontSize="xl" p="4" pb="3">
  Current Quests
</Heading>
<FlatList data={activeQuestsDesc} renderItem={({
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
            {item.completed ? "Completed" : "In Progress"}
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