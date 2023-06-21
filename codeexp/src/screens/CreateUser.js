import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { authsecondary } from "../Firebase";

import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Input,
  Stack,
  TextArea,
  Pressable,
  Image,
  ScrollView,
  Text,
  Button,
  Icon,
  Spinner,
  Avatar,
} from "native-base";

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase";
import ReturnButton from "../components/ReturnButton";
import { AntDesign } from "@expo/vector-icons";

const CreateUser = ({ navigation }) => {
  const Auth = auth;
  const AuthSecondary = authsecondary;
  console.log(Auth.currentUser.uid, "manager UID");
  const [name, setName] = useState("Name");
  const [username, setUserName] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  const [faction, setFaction] = useState("");
  const [show, setShow] = useState(false);
  const [errormsg, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState(Array);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function managerData() {
      const docRef = doc(firestore, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFaction(docSnap.data().faction);
        setLoaded(true);
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
      const docRef2 = doc(firestore, "factions", docSnap.data().faction);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        console.log("Document data:", docSnap2.data());
        setMembers(docSnap2.data().members);
      } else {
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
    }
    managerData();
  }, []);

  const handleClick = () => setShow(!show);

  async function uploadData(name, username, email, faction, UID, members) {
    const employeeData = {
      name: name,
      username: username,
      email: email,
      faction: faction,
      about: "",
      achievements: [],
      assignedQuest: [],
      currency: 0,
      postHistory: [],
      socialQuest: [],
    };
    await setDoc(doc(firestore, "users", UID), employeeData);

    const newArray = [
      ...members,
      {
        name: name,
        uid: UID,
      },
    ];
    await updateDoc(doc(firestore, "factions", faction), {
      members: newArray,
    });
  }

  const createAcc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        AuthSecondary,
        email,
        password
      );
      /* Signed in */
      const user = userCredential.user;
      console.log(user.uid);
      console.log(Auth.currentUser.uid, "manager UID");
      console.log(AuthSecondary.currentUser.uid, "employee UID");
      uploadData(
        name,
        username,
        email,
        faction,
        AuthSecondary.currentUser.uid,
        members
      );
      navigation.navigate("ManagerDashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  return (
    <Box safeArea>
      <ReturnButton />
      <HStack justifyContent="center" m={4}>
        <Avatar
          bg="gray.200"
          size="2xl"
          icon={<Icon as={AntDesign} name="user" size="lg" />}
        />
      </HStack>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="black"
          size="md"
          isDisabled
          placeholder={faction}
          value={faction}
          height={10}
        />
        <Input
          color="black"
          size="md"
          placeholder="Name"
          onChangeText={(newText) => setName(newText)}
          height={10}
          placeholderTextColor="gray.400"
        />
        <Input
          color="black"
          size="md"
          placeholder="Username"
          onChangeText={(newText) => setUserName(newText)}
          height={10}
          placeholderTextColor="gray.400"
        />
        <Input
          color="black"
          size="md"
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
          height={10}
          placeholderTextColor="gray.400"
        />
        <Input
          type={show ? "text" : "password"}
          w="100%"
          height={10}
          py="0"
          color="black"
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/5"
              h="full"
              onPress={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
        />

        <Button
          bg={"success.500"}
          onPress={createAcc}
          rounded="full"
          width={250}
          alignSelf="center"
        >
          Create Account
        </Button>
        <Text color="red">{errormsg}</Text>

        {/* Image Upload */}
        {/* Your image upload logic here */}
      </Stack>
    </Box>
  );
};

export default CreateUser;
