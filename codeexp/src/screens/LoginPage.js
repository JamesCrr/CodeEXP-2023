import { useState } from "react";
import { auth, firestore } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Box, Button, Input } from "native-base";
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useAppContext();
  const dispatch = useAppDispatchContext();

  const verifyLogin = async () => {
    // console.log(email);
    // Attempt to Login
    try {
      // console.log(auth, email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // Login Successful, Get the rest of user data
      const docSnap = await getDoc(doc(firestore, "users", uid));
      if (docSnap.exists()) {
        const userDataObject = docSnap.data();
        // console.log("Document data:", userDataObject);
        // Update user information in Context
        dispatch({ type: "setUserInfo", val: { ...userDataObject, uid } });
        // User information retrieved successfully, navigate to next page
        navigation.replace("UserStack");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
    }
  };
  // const goToViewPostsScreen = () => {
  //     navigation.navigate("ViewPostsScreen",{userId:Id});
  //     }

  return (
    <Box>
      <Input
        mx="3"
        placeholder="Input email"
        w="100%"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        mx="3"
        placeholder="Input password"
        w="100%"
        // type="password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button onPress={() => verifyLogin()}>Click Me</Button>
    </Box>
  );
};

export default LoginPage;
