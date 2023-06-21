import { FactionBoardComponent } from "../components/leaderboardItem";
import { useState, useEffect } from "react";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase";
import React from "react";
import { Center, Heading, Box, HStack, Spinner, Text } from "native-base";
import ReturnButton from "../components/ReturnButton";

const UserLeaderboard = ({ navigation }) => {
  const [users, setUsers] = useState(Array);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function UserData() {
      const usersData = [];
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const userObj = {
          userName: doc.data().username,
          currency: doc.data().currency,
        };
        usersData.push(userObj);
        console.log("pushed");
      });
      setUsers(usersData);
      setLoaded(true);
    }
    UserData();
  }, []);
  const sorted = users.sort((a, b) => {
    return b.currency - a.currency;
  });
  console.log(sorted);
  if (loaded) {
    return (
      <Box safeArea>
        <Box>
          {/* <ReturnButton /> */}
          <Heading alignSelf="center" fontSize={"3xl"} marginTop={10} color="primary.500">
            User Leaderboard
          </Heading>
        </Box>
        {sorted.map(function (data) {
          return (
            <FactionBoardComponent
              key={data.userName}
              name={data.userName}
              placing={sorted.indexOf(data)}
              currency={data.currency}
              navigation={navigation}
            ></FactionBoardComponent>
          );
        })}
      </Box>
    );
  } else {
    return (
      <HStack space={2} justifyContent="center" height={"100%"} alignItems={"center"}>
        <Spinner accessibilityLabel="Loading posts" size={"lg"} />
        <Text color="primary.500" fontSize="md" textAlign={"center"} fontWeight={"bold"}>
          Loading
        </Text>
      </HStack>
    );
  }
};

export default UserLeaderboard;
