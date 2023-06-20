import {
  Divider,
  Box,
  Heading,
  HStack,
  VStack,
  Select,
  FormControl,
  CheckIcon,
  WarningOutlineIcon,
  Input,
  TextArea,
  Slider,
  Text,
  Button,
  Spinner,
  Spacer,
} from "native-base";
import { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import { auth } from "../Firebase";
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

import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ReturnButton from "../components/ReturnButton";

const CreateQuest = ({ navigation }) => {
  const [ManagerQuest, setManagerQuest] = useState(Array);
  const [members, setMembers] = useState(Array);
  const [loaded, setLoaded] = useState(false);

  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [currency, setCurrency] = useState(70);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [questId, setQuestId] = useState(0);

  useEffect(() => {
    const Auth = auth;
    async function managerData() {
      const docRef = doc(firestore, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(
          "Document data:",
          docSnap.data().assignedQuest,
          "ASSIGNED QUEST"
        );
        setManagerQuest(docSnap.data().assignedQuest);
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
      const docRef2 = doc(firestore, "factions", docSnap.data().faction);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        console.log("Document data:", docSnap2.data());
        const memberarray = [];
        docSnap2.data().members.map((item) => {
          const memberitem = {};
          memberitem.id = item.uid;
          memberitem.name = item.name;
          console.log(memberitem);
          memberarray.push(memberitem);
          setMembers(memberarray);
        });
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
      setLoaded(true);
    }
    managerData();
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems);
    setSelected(selectedItems);
    console.log(selected);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log(new Date(currentDate));
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
      /* for iOS, add a button that closes the picker */
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const uploadQuest = async () => {
    const docRef = doc(collection(firestore, "quests"));
    setQuestId(docRef.id);
    console.log(docRef.id);
    await setDoc(docRef, {
      type: "assigned",
      currency: currency,
      title: title,
      details: details,
      questMembers: selected,
      deadline: date,
      completed: false,
    });
    const Auth = auth;
    const ManagerRef = doc(firestore, "managers", Auth.currentUser.uid);
    await updateDoc(ManagerRef, {
      assignedQuest: arrayUnion({
        completed: false,
        questId: docRef.id,
      }),
    });
    selected.forEach(async (user) => {
      const userRef = doc(firestore, "users", user);
      await updateDoc(userRef, {
        assignedQuest: arrayUnion({
          completed: false,
          questId: docRef.id,
        }),
      });
    });
    navigation.navigate("ManagerDashboard");
  };

  const uploadData = () => {
    uploadQuest();
  };

  if (loaded) {
    return (
      <VStack space={4}>
        <ReturnButton />
        <Box bg="primary.400" width="75%" alignSelf="center">
          <SectionedMultiSelect
            items={members}
            IconRenderer={MaterialIcons}
            uniqueKey="id"
            subKey="children"
            selectText="Choose Quest Members"
            showDropDowns={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selected}
            styles={{
              selectToggleText: {
                color: "white",
                fontSize: 14,
              },
            }}
          />
        </Box>
        <Input
          width={"75%"}
          alignSelf={"center"}
          bg={"primary.400"}
          variant="rounded"
          placeholder="Quest Title"
          placeholderTextColor={"white"}
          onChangeText={(newText) => setTitle(newText)}
        />
        <Box>
          <Text color="black" textAlign="center" fontSize={15}>
            Currency Earned
          </Text>
          <Text color="black" textAlign="center" fontSize={20}>
            {currency}
          </Text>
        </Box>
        <Slider
          defaultValue={70}
          colorScheme="cyan"
          onChange={(v) => {
            setCurrency(Math.floor(v));
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <TextArea
          h={20}
          bg={"primary.400"}
          placeholder="Quest Details"
          placeholderTextColor={"white"}
          w="90%"
          alignSelf={"center"}
          onChangeText={(newText) => setDetails(newText)}
        />
        <HStack alignSelf={"center"} space={5}>
          <Button onPress={showDatepicker}>Due Date</Button>
          <Button onPress={showTimepicker}>Due Time</Button>
        </HStack>

        <Text paddingLeft={3}>Selected Dateline: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Button
          width="70%"
          alignSelf={"center"}
          rounded={"full"}
          onPress={uploadData}
        >
          Create
        </Button>
      </VStack>
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

export default CreateQuest;
