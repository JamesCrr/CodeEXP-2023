import { auth, database } from "../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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

const CreateUser = ({ navigation }) => {
  const Auth = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errormsg, setError] = useState("");

  const handleClick = () => setShow(!show);

  const createAcc = () => {
    console.log({ email }, { password });
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };
  const Submit = () => {
    console.log(email, password);
  };
  return (
    <Box>
      return{" "}
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="black"
          size="md"
          placeholder={email}
          value={email}
          onChangeText={(newText) => setEmail(newText)}
        />
        {/* <Input
          color="black"
          size="md"
          placeholder={password}
          value={password}
        /> */}
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
};

export default CreateUser;
