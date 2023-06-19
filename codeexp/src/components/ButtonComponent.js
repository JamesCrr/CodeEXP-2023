import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export const ButtonComponent = ({ name, navigation, screen }) => {
  return <Button onPress={() => navigation.navigate(screen)}>{name}</Button>;
};
