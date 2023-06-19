import { firestore } from '../Firebase';
import { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext, useAppDispatchContext } from "../AppProvider";
// import { addTestData } from '../components/QuestSubmission';


// const ViewQuests = ({ navigation }) => {
//     // console.log(firestore);

// const test = async () => {

//     const docRef = doc(firestore, "users", "44yPek9RPfgJMUUJqDVGgUFl2u42");
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//         const quests = docSnap.data().socialQuest;
//       console.log("Document data:", docSnap.data().socialQuest);
//       console.log(docSnap.data().socialQuest);
//     } else {
//       // docSnap.data() will be undefined in this case
//       console.log("No such document!");
//     }
// }
// test();

//     return <Box>
    
//     <Box alignSelf="center" // bg="primary.500"
//   _text={{
//     fontSize: "md",
//     fontWeight: "medium",
//     color: "warmGray.50",
//     letterSpacing: "lg",
//     radius: "5",
//   }} bg={["red.400", "blue.400"]}>
//       This is a Box
//     </Box>
//   </Box>;
// };

// export default ViewQuests;
const ViewQuests = () => {
    const navigation = useNavigation();
    const [quests, setQuests] = useState([]);
    const [grabDataState, setGrabDataState] = useState(false);
    const { uid } = useAppContext();
    const [activeQuestsId,setActiveQuestsId] = useState([]);
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
    
};retrieveData();
    }, [grabDataState]);

useEffect(() => {
quests.map((key) => {
    console.log(key.questsId);
    const retrieveQuests = async () => {
    const docRef = doc(firestore, "quests", key.questsId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    const activeQuests = docSnap.data();
    setActiveQuestsDesc(prevQuestsDesc=>[...prevQuestsDesc,activeQuests]);
      console.log("Quests data:", docSnap.data());
      console.log(docSnap.data());

    } else {
      console.log("No such document!");
    }
}
retrieveQuests();
});
},[grabDataState]);

//iterate user's quests and retrieve quests data 
// Object.keys(quests).map((key) => {
//       console.log(quests[key].questsId);
//       setActiveQuestsId(prevQuestsId=>[...prevQuestsId,quests[key].questsId]);
//  });
//  console.log("activeQuests"+activeQuestsId);

// activeQuestsId.map((key) => {
//     console.log("ACTQUEST"+activeQuestsId);
//     console.log("key"+key);
//     const retrieveQuests = async () => {
//     const docRef = doc(firestore, "quests", key);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//     const activeQuests = docSnap.data();
//       console.log("Quests data:", docSnap.data());
//       console.log(docSnap.data());

//     } else {
//       console.log("No such document!");
//     }
// };retrieveQuests();
// });
const goToCreatePostScreen = () => {
navigation.navigate("CreatePostScreen");
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
          <Pressable onPress={() => goToCreatePostScreen()}>
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