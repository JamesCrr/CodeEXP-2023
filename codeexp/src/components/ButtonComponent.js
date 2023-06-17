import { Button } from "native-base";

export const ButtonComponent = ({ name, navigation }) => {
  return (
    <Button onPress={() => navigation.navigate("FirstScreen")}>{name}</Button>
  );
};
