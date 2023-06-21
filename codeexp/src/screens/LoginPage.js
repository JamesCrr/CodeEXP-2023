import { useState } from "react";
import { auth, firestore } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Input, FormControl, Spacer, Text } from "native-base";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { Ionicons } from "@expo/vector-icons";
import ReturnButton from "../components/ReturnButton";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatchContext();
  const handleClick = () => setShowPassword(!showPassword);

  const verifyLogin = async () => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const docSnap = await getDoc(doc(firestore, "users", uid));
      if (docSnap.exists()) {
        const userDataObject = docSnap.data();
        dispatch({ type: "setUserInfo", val: { ...userDataObject, uid } });
        navigation.replace("UserStack");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error.message);

      alert("Invalid account credentials! Please try again");
    }

    setIsLoading(false);
  };

  return (
    <Box safeArea>
      <ReturnButton />
      <Spacer my={10} />
      <Text fontSize="3xl" textAlign="center" color={"primary.500"} fontFamily={"Montserrat-SemiBold"}>
        Log In
      </Text>
      <Spacer my={2} />
      <FormControl space={4} w="75%" maxW="300px" mx="auto">
        <Input
          py="0"
          color="black"
          w="100%"
          h="50px"
          fontSize={"sm"}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          _web={{
            outlineWidth: 0,
          }}
        />
      </FormControl>
      <Spacer my={2} />
      <FormControl space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="black"
          size="md"
          w="100%"
          h="50px"
          fontSize={"sm"}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          type={showPassword ? "text" : "password"}
          _web={{
            outlineWidth: 0,
          }}
          InputRightElement={
            <Button size="xs" rounded="none" w="1/5" h="full" onPress={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          }
        />
      </FormControl>
      <Spacer my={10} />
      <Button
        onPress={verifyLogin}
        w="75%"
        mt="3"
        alignSelf="center"
        bg="primary.500"
        rounded={"full"}
        _pressed={{ bg: "base.700" }}
        _text={{ color: "white" }}
        isLoading={isLoading}
        isLoadingText="Logging In"
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginPage;
