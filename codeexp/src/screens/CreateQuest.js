import {
  Divider,
  Box,
  Heading,
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
} from "native-base";
import { useState, useEffect } from "react";
import { db } from "../Firebase";
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

const CreateQuest = () => {
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
      const docRef = doc(db, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(
          "Document data:",
          docSnap.data().assignedQuest,
          "ASSIGNED QUEST"
        );
        setManagerQuest(docSnap.data().assignedQuest);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      const docRef2 = doc(db, "factions", docSnap.data().faction);
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
        // docSnap.data() will be undefined in this case
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
      // for iOS, add a button that closes the picker
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
    const docRef = doc(collection(db, "quests"));
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
    const ManagerRef = doc(db, "managers", Auth.currentUser.uid);
    await updateDoc(ManagerRef, {
      assignedQuest: arrayUnion(docRef.id),
    });
    selected.forEach(async (user) => {
      const userRef = doc(db, "users", user);
      await updateDoc(userRef, {
        assignedQuest: arrayUnion(docRef.id),
      });
    });
  };

  const uploadData = () => {
    uploadQuest();
  };

  if (loaded) {
    return (
      <VStack space={4} alignItems="center">
        <SectionedMultiSelect
          items={members}
          IconRenderer={MaterialIcons}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          showDropDowns={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selected}
        />
        <Input
          variant="rounded"
          placeholder="Quest title"
          onChangeText={(newText) => setTitle(newText)}
        />
        <Text color="black" textAlign="center">
          Currency Earned - {currency}
        </Text>
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
          placeholder="Quest Details"
          w="75%"
          maxW="300"
          onChangeText={(newText) => setDetails(newText)}
        />
        <Button onPress={showDatepicker}>Show date picker!</Button>
        <Button onPress={showTimepicker}>Show time picker!</Button>
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Button onPress={uploadData}>Create</Button>
      </VStack>
    );
  }
};

export default CreateQuest;
