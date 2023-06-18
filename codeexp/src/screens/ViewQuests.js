import { firestore } from '../Firebase';
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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

    useEffect(() => {
const retrieveData = async () => {
    const docRef = doc(firestore, "users", "44yPek9RPfgJMUUJqDVGgUFl2u42");
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
console.log(quests);

const goToCreatePostScreen = () => {
navigation.navigate("CreatePostScreen");
};

return <Box>
<Heading fontSize="xl" p="4" pb="3">
  Current Quests
</Heading>
<FlatList data={quests} renderItem={({
item
}) => <Box borderBottomWidth="1" _dark={{
borderColor: "muted.50"
}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
      <HStack space={[2, 3]} justifyContent="space-between">
        <VStack>

          <Text _dark={{
      color: "warmGray.50"
    }} color="coolGray.800" bold>
            {item.name}
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
    </Box>} keyExtractor={item => item.startdate} />
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