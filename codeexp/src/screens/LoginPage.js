import { auth } from '../Firebase';
import { Box, Button,Input } from "native-base";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"; 
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


const verifyLogin = () => { 
    console.log(email);
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user.uid;
    console.log(user);
    navigation.navigate("ViewPostsScreen",{uid:user});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("invalid account");
  });
}
// const goToViewPostsScreen = () => {
//     navigation.navigate("ViewPostsScreen",{userId:Id});
//     }

    return(
    <Box>
    <Input mx="3" placeholder="Input email" w="100%" value={email} onChangeText={(text) => {
              setEmail(text)}}/>
    <Input mx="3" placeholder="Input password" w="100%" value={password} onChangeText={(text) => {
              setPassword(text)}}/>
    <Button onPress={() => verifyLogin()}>Click Me</Button>
    </Box>
    );

};

export default LoginPage;