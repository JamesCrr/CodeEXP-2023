import {
  Divider,
  Box,
  Heading,
  VStack,
  Select,
  FormControl,
  CheckIcon,
  WarningOutlineIcon,
} from "native-base";
import { useState, useEffect } from "react";
import { View } from "react-native";

import MultiSelect from "react-native-multiple-select";

const CreateQuest = () => {
  const items = [
    {
      id: "92iijs7yta",
      name: "Ondo",
    },
    {
      id: "a0s0a8ssbsd",
      name: "Ogun",
    },
    {
      id: "16hbajsabsd",
      name: "Calabar",
    },
    {
      id: "nahs75a5sg",
      name: "Lagos",
    },
    {
      id: "667atsas",
      name: "Maiduguri",
    },
    {
      id: "hsyasajs",
      name: "Anambra",
    },
    {
      id: "djsjudksjd",
      name: "Benue",
    },
    {
      id: "sdhyaysdj",
      name: "Kaduna",
    },
    {
      id: "suudydjsjd",
      name: "Abuja",
    },
  ];
  const [selected, setSelected] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    const selectArray = [];
    selectArray.push(selectedItems);
    setSelected(selectArray);
  };
  return (
    <VStack space={4} alignItems="center">
      <MultiSelect
        hideTags
        items={items}
        uniqueKey="id"
        // ref={(component) => {
        //   this.multiSelect = component;
        // }}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selected}
        selectText="Add Employees"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
    </VStack>
  );
};

export default CreateQuest;
