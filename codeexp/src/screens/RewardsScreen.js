import { Box, HStack, VStack, Pressable, Text, Image, Button } from "native-base";
import { useState } from "react";
import { firestore } from "../Firebase";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const starbucksIcon = require("../../assets/starbucksRedeemIcon.jpg");
// /Users/matthias/Documents/GitHub/CodeEXP-2023/codeexp/assets/starbucksRedeemIcon.jpg
// /Users/matthias/Documents/GitHub/CodeEXP-2023/codeexp/src/screens/RewardsScreen.js
const RewardsScreen = () => {
  const { userInfo } = useAppContext();
  const [currency, setCurrency] = useState(0);
  let navigation = useNavigation();

  useEffect(() => {
    const getCurrency = async () => {
      const docRef = doc(firestore, "users", userInfo.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().currency);
        setCurrency(docSnap.data().currency);
      } else {
        console.log("No such document!");
      }
    };
    getCurrency();
  }, []);
  // console.log("Currency: ", currency);

  const redeemAlert = async () => {
    // Update firestore user currency
    const docRef = doc(firestore, "users", userInfo.uid);
    try {
      await updateDoc(docRef, {
        currency: parseInt(currency) - 20,
      });
      console.log("updated!");
    } catch (e) {
      console.log(e.message);
    }

    alert("Your redemption is successfull!. Instructions have been sent to email!");
    setCurrency((prevCurrency) => currency - 20);
  };

  return (
    <Box safeArea>
      <Box bg={"primary.600"} paddingTop={6}>
        <Box padding={50}>
          <Text textAlign={"center"} fontSize={"xl"} color={"warmGray.100"}>
            Individual Points
          </Text>
          <Text textAlign={"center"} fontSize={"6xl"} color={"white"} fontWeight={"bold"} lineHeight={70}>
            {currency}
          </Text>
        </Box>
      </Box>

      {/* Body Box */}
      <Box marginX={4}>
        {/* See Currency History */}
        {/* <Box margin={3}>
          <Pressable
            borderWidth={1}
            width={"45%"}
            onPress={() => {
              console.log("See Currency History");
            }}
          ></Pressable>
        </Box> */}

        {/* Individual Rewards */}
        <Box marginTop={5}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} alignSelf={"center"}>
              Claim Individual Rewards
            </Text>
            <Pressable
              onPress={() => {
                console.log("See All Individual");
              }}
              borderWidth={1}
              borderColor={"primary.700"}
              borderRadius={6}
              padding={1}
            >
              <Text color={"primary.700"}>See all</Text>
            </Pressable>
          </HStack>
          <VStack space={2}>
            <Image
              source={starbucksIcon}
              // source={{
              //   uri: "https://motoristprod.s3.amazonaws.com/uploads/reward/image/21/Starbucks_Gift_Card-new.png",
              // }}
              alt="no image cb"
              size={40}
              alignSelf={"center"}
              resizeMode={"center"}
            />
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Starbucks $10 Voucher
            </Text>
            <Text color={"red.400"} fontWeight={"bold"}>
              -20 Points
            </Text>
            <Button marginTop={55} onPress={redeemAlert}>
              Redeem!
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
export default RewardsScreen;
