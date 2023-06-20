import { Button, Heading, Divider, Box, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const QuestComponent = ({ questData, navigation, screen }) => {
  console.log(questData);
  const [member, setMember] = useState();
  const [loaded, setLoaded] = useState(false);

  let date = questData.deadline.toDate().toDateString();
  const members = questData.questMembers;
  const mainMember = questData.questMembers[0];
  useEffect(() => {
    async function EmployeeData() {
      const docRef = doc(firestore, "users", mainMember);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setMember(docSnap.data().name);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    EmployeeData();
    setLoaded(true);
  }, []);
  if (loaded) {
    return (
      <Box alignItems="center">
        <Box w="90%">
          <Heading mx="3" alignItems="center" flexDirection="row">
            {questData.title}
          </Heading>
          <Divider
            my="2"
            _light={{
              bg: "muted.800",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
          <Text mx="3" alignItems="center" flexDirection="row">
            Deadline: {date}
          </Text>
          <Text mx="3" alignItems="center" flexDirection="row">
            {member}+{members.length - 1} others
          </Text>
          <Button onPress={() => navigation.navigate(screen)}>Manage Quest</Button>
        </Box>
      </Box>
    );
  }
};
