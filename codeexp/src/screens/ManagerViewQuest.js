import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { firestore } from "../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  Box,
  Badge,
  HStack,
  Input,
  Stack,
  TextArea,
  Pressable,
  Image,
  ScrollView,
  Text,
  Button,
  Icon,
} from "native-base";
import { QuestComponent } from "../components/questComponent";

const ManagerViewQuest = ({ navigation }) => {
  const Auth = auth;
  const [loaded, setLoaded] = useState(Array);
  const [numOfQuest, setNum] = useState(0);
  const [allQuestState, setAllQuest] = useState([]);

  const allQuestArray = [];
  useEffect(() => {
    async function managerData() {
      const docRef = doc(firestore, "managers", Auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        var allQuest = docSnap.data().assignedQuest;
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      await Promise.all(
        allQuest.map(async (item) => {
          const docRef2 = doc(firestore, "quests", item);
          const docSnap2 = await getDoc(docRef2);
          //   return docSnap2;
          allQuestArray.push(docSnap2.data());
        })
      );
      console.log(allQuestArray, "allQuestArray");
      setNum(allQuestArray.length);
      setAllQuest(allQuestArray);
      setLoaded(true);
    }
    managerData();
  }, []);
  if (loaded) {
    return (
      <Box>
        <Badge>{numOfQuest}</Badge>
        <React.Fragment>
          {allQuestState.map((quest) => {
            return (
              <QuestComponent
                questData={quest}
                navigation={navigation}
                screen="placeholder"
              ></QuestComponent>
            );
          })}
        </React.Fragment>
      </Box>
    );
  }
};
export default ManagerViewQuest;
