import {
  Button,
  Heading,
  Box,
  VStack,
  Icon,
  HStack,
  Flex,
  Text,
  Spacer,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const QuestComponent = ({ questData, navigation, screen }) => {
  console.log(questData);
  const [member, setMember] = useState();
  const [loaded, setLoaded] = useState(false);

  let date = questData.deadline.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
        /* docSnap.data() will be undefined in this case */
        console.log("No such document!");
      }
    }
    EmployeeData();
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <Box
        width="90%"
        rounded={"full"}
        height={60}
        alignSelf="center"
        borderRadius="lg"
        bg="background.500"
        my={4}
        pt={2}
        paddingTop={2}
      >
        <HStack space={2} mx="3" alignItems="center">
          <Icon as={Ionicons} name="flag" size="lg" />
          <VStack alignItems="flex-start" justifyContent="center">
            <Heading isTruncated fontSize="md">
              {questData.title}
            </Heading>
            <Text>
              {member}+{members.length - 1} others
            </Text>
          </VStack>
          <Spacer />
          <VStack>
            <Text>Deadline:</Text>
            <Heading isTruncated fontSize="sm" color="gray.500">
              {date}
            </Heading>
          </VStack>
          <Button
            bg="background.500"
            size="sm"
            endIcon={
              <Icon
                as={Ionicons}
                name="chevron-forward"
                size={5}
                color="black"
              />
            }
            onPress={() =>
              navigation.navigate("ManageQuest", { questData, date })
            }
          />
        </HStack>
      </Box>
    );
  }
};
