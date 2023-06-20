import { FactionBoardComponent } from "../components/leaderboardItem";
import { useState, useEffect } from "react";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {firestore } from "../Firebase";
import React from "react";
import { Center, Heading, Box } from "native-base";

const FactionLeaderboard = ({ navigation }) => {
  const [faction, setFaction] = useState(Array);
  useEffect(() => {
    async function FactionData() {
      const factionData = [];
      const querySnapshot = await getDocs(collection(firestore, "factions"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const factionObj = {
          factionName: doc.id,
          factionCurrency: doc.data().currency,
        };
        factionData.push(factionObj);
        console.log("pushed");
      });
      setFaction(factionData);
    }
    FactionData();
  }, []);
  console.log(faction);
  const sorted = faction.sort((a, b) => {
    return b.factionCurrency - a.factionCurrency;
  });
  console.log(sorted);
  return (
    <>
      <Box alignItems="center">
        <Heading fontSize={"3xl"} color="primary.500">
          Faction Leaderboard
        </Heading>
      </Box>
      {sorted.map(function (data) {
        return (
          <FactionBoardComponent
            key={data.factionName}
            name={data.factionName}
            placing={sorted.indexOf(data)}
            currency={data.factionCurrency}
            navigation={navigation}
          ></FactionBoardComponent>
        );
      })}
    </>
  );
};

export default FactionLeaderboard;
