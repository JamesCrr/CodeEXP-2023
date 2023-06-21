import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  Spacer,
} from "native-base";
import ReturnButton from "../components/ReturnButton";

const auth = getAuth();

const ManagerLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errormsg, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const signin = async () => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log(user, "userdetails");
      navigation.navigate("ManagerDashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid account credentials! Please try again");
      // setError(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <Box safeArea>
      <ReturnButton />
      <Spacer my={10} />
      <Text fontSize="3xl" textAlign="center" color={"primary.500"} fontFamily={"Montserrat-SemiBold"}>
        Admin Log In
      </Text>
      <Spacer my={2} />
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="black"
          size="md"
          w="100%"
          h="50px"
          placeholder="Email"
          value={email}
          onChangeText={(newText) => setEmail(newText)}
        />
        <Input
          type={show ? "text" : "password"}
          w="100%"
          py="0"
          color="black"
          h="50px"
          InputRightElement={
            <Button size="xs" rounded="none" w="1/5" h="full" onPress={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
        />
        <Spacer my={8} />
        <Button rounded={"full"} onPress={signin} isLoading={isLoading} isLoadingText="Logging In">
          Log In
        </Button>
        <Text color="red">{errormsg}</Text>
      </Stack>
    </Box>
  );
};

export default ManagerLogin;
