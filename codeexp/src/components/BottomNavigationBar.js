import { Box, IconButton, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const iconSize = "30";
const buttonSize = "50";
const buttonVariant = "ghost";
const selectedColor = "primary.500";
const nonSelectedColor = "black";
export const screensToSelect = {
  Home: "Home",
  Leaderboard: "Leaderboard",
  Tasks: "Tasks",
  Account: "Account",
};
const BottomNavigationBar = ({ selectedScreen }) => {
  const navigation = useNavigation();
  homeButtonColor = selectedScreen == screensToSelect.Home ? selectedColor : nonSelectedColor;
  LeaderboardButtonColor = selectedScreen == screensToSelect.Leaderboard ? selectedColor : nonSelectedColor;
  TasksButtonColor = selectedScreen == screensToSelect.Tasks ? selectedColor : nonSelectedColor;
  AccountButtonColor = selectedScreen == screensToSelect.Account ? selectedColor : nonSelectedColor;

  return (
    <Box bg={"trueGray.300"} minW={"10"}>
      <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={buttonSize}
          //   borderWidth={1}
          variant={buttonVariant}
          onPress={() => {
            if (selectedScreen !== "Home") {
              navigation.replace("ViewPostsScreen");
            }
          }}
          _icon={{ as: MaterialIcons, name: "home", size: iconSize, color: homeButtonColor }}
          _pressed={{ background: "none" }}
        />
        <IconButton
          size={buttonSize}
          //   borderWidth={1}
          variant={buttonVariant}
          onPress={() => {
            if (selectedScreen !== "Leaderboard") {
              navigation.replace("LeaderboardScreen");
            }
          }}
          _icon={{
            as: Ionicons,
            name: "ios-podium",
            size: iconSize - 7,
            color: LeaderboardButtonColor,
          }}
          _pressed={{ background: "none" }}
        />
        <IconButton
          size={buttonSize}
          //   borderWidth={1}
          variant={buttonVariant}
          onPress={() => {
            navigation.navigate("CreatePostScreen");
          }}
          _icon={{ as: MaterialIcons, name: "add", size: iconSize, color: "black" }}
          _pressed={{ background: "none" }}
        />
        <IconButton
          size={buttonSize}
          //   borderWidth={1}
          variant={buttonVariant}
          onPress={() => {
            if (selectedScreen !== "Tasks") {
              // navigation.replace("QuestsScreen")
            }
          }}
          _icon={{ as: FontAwesome5, name: "tasks", size: iconSize - 5, color: TasksButtonColor }}
          _pressed={{ background: "none" }}
        />
        <IconButton
          size={buttonSize}
          //   borderWidth={1}
          variant={buttonVariant}
          onPress={() => {
            if (selectedScreen !== "Account") {
              navigation.replace("UserAccountScreen");
            }
          }}
          _icon={{ as: MaterialIcons, name: "account-circle", size: iconSize, color: AccountButtonColor }}
          _pressed={{ background: "none" }}
        />
      </HStack>
    </Box>
  );
};
export default BottomNavigationBar;
