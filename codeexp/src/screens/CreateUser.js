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
} from "native-base";

import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const CreateUser = () => {
  const Auth = auth;
  const AuthSecondary = authsecondary;
  console.log(Auth.currentUser.uid, "manager UID");

  useEffect(() => {
    async function managerData() {
      const docRef = doc(db, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFaction(docSnap.data().faction);
        setLoaded(true);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    managerData();
  }, []);
  const [name, setName] = useState("Name");
  const [username, setUserName] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  const [faction, setFaction] = useState("");
  const [show, setShow] = useState(false);
  const [errormsg, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => setShow(!show);

  async function uploadData(name, username, email, faction, UID) {
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
    await setDoc(doc(db, "users", UID), employeeData);
  }

  const createAcc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        AuthSecondary,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
      console.log(Auth.currentUser.uid, "manager UID");
      console.log(AuthSecondary.currentUser.uid, "employee UID");
      uploadData(name, username, email, faction, AuthSecondary.currentUser.uid);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      // ..
    }
  };

  if (loaded) {
    return (
      <Box>
        return{" "}
        <Stack space={4} w="75%" maxW="300px" mx="auto">
          <Input
            color="black"
            size="md"
            isDisabled
            placeholder={faction}
            value={faction}
          />
          <Input
            color="black"
            size="md"
            placeholder={name}
            value={name}
            onChangeText={(newText) => setName(newText)}
          />
          <Input
            color="black"
            size="md"
            placeholder={username}
            value={username}
            onChangeText={(newText) => setUserName(newText)}
          />
          <Input
            color="black"
            size="md"
            placeholder={email}
            value={email}
            onChangeText={(newText) => setEmail(newText)}
          />
          <Input
            type={show ? "text" : "password"}
            w="100%"
            py="0"
            color="black"
            InputRightElement={
              <Button
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
            placeholder="Password"
            onChangeText={(newText) => setPassword(newText)}
          />
          <Button onPress={createAcc}>Create Acc</Button>
          <Text color="red">{errormsg}</Text>
        </Stack>
      </Box>
    );
  }
};

export default CreateUser;
