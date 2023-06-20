import { useState } from "react";
import { auth, firestore } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Input,
  FormControl,
  IconButton,
  Spacer,
  Text,
} from "native-base";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { Ionicons } from "@expo/vector-icons";
import ReturnButton from "../components/ReturnButton";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatchContext();
  const handleClick = () => setShowPassword(!showPassword);

  const verifyLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      alert(error.message);
    }
  };

  return (
    <Box>
      <ReturnButton />
      <Spacer my={2} />
      <Text
        fontSize="3xl"
        fontWeight="900"
        textAlign="center"
        color={"primary.500"}
        fontFamily={"Montserrat-SemiBold"}
      >
        User Log In
      </Text>
      <Spacer my={2} />
      <FormControl space={4} w="75%" maxW="300px" mx="auto">
        <Input
          w="100%"
          py="0"
          color="black"
          h="50px"
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
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          type={showPassword ? "text" : "password"}
          _web={{
            outlineWidth: 0,
          }}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/5"
              h="full"
              onPress={handleClick}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          }
        />
      </FormControl>
      <Spacer my={1} />
      <Button
        onPress={verifyLogin}
        w="75%"
        mt="3"
        alignSelf="center"
        bg="primary.500"
        _pressed={{ bg: "blue.700" }}
        _text={{ color: "white" }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginPage;
