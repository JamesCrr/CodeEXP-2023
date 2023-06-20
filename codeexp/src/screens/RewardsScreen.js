import { Box, HStack, Pressable, Text, Image, Button } from "native-base";
import { useState } from "react";
import { firestore } from "../Firebase";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const RewardsScreen = () => {
  const { userInfo } = useAppContext();
  const [currency, setCurrency] = useState(0);
  let navigation = useNavigation();
  // /Users/matthias/Documents/GitHub/CodeEXP-2023/codeexp/assets/starbucksRedeemIcon.jpg
  // /Users/matthias/Documents/GitHub/CodeEXP-2023/codeexp/src/screens/RewardsScreen.js
  const starbucksIcon = require("../../assets/starbucksRedeemIcon.jpg");
  const getCurrency = async () => {
    const docRef = doc(firestore, "users", userInfo.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().currency);
      setCurrency(docSnap.data().currency);
    } else {
      console.log("No such document!");
    }
  };
  getCurrency();
  console.log("Currency: ", currency);

  const redeemAlert = async () =>{
    //update firestore user currency
    //update user currency
    const docRef = doc(firestore, "users", userInfo.uid);
    try{
      await updateDoc(docRef, {
      currency: parseInt(currency) - 20,
    });
  }catch(e){
    console.log(e);
  }

    alert("Your redemption is successfull!. Instructions have been sent to email!");
    try{
    navigation.replace("RewardsScreen");
  }catch(e){
    console.log(e);
  }
  }
  return (
    <Box>
      <Box bg={"orange.400"}>
        <Box>
          <Text textAlign={"center"}>Individual Currency</Text>
          <Text textAlign={"center"}>{currency}</Text>
        </Box>
      </Box>

      {/* Body Box */}
      <Box marginX={2}>
        {/* See Currency History */}

        <Box margin={3}>
          <Pressable
            borderWidth={1}
            width={"45%"}
            onPress={() => {
              console.log("See Currency History");
            }}
          >
          </Pressable>
        </Box>

        {/* Individual Rewards */}
        <Box marginTop={5}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Claim Individual Rewards</Text>
            <Pressable
              onPress={() => {
                console.log("See All Individual");
              }}
              borderWidth={1}
            >
              <Text>See all</Text>
            </Pressable>
          </HStack>
          <HStack space={2}>
            <Box>
          <Image
          source={
          starbucksIcon
          }
          alt="no image cb"
          width={"sm"}
          height={"sm"}
          resizeMode={"center"}
        />
        <Text bold> Starbucks $10 voucher</Text>
        <Text>20 Currency</Text>
        <Button onPress = {redeemAlert}>Redeem!</Button>
        </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
export default RewardsScreen;
