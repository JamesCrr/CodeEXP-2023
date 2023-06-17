import { ButtonComponent } from "../components/ButtonComponent";
import {
  VStack,
  HStack,
  Center,
  Container,
  Heading,
  Text,
  Box,
  Pressable,
  Badge,
} from "native-base";

export default function Profile({ navigation }) {
  return (
    <Box
      p="2"
      bg="primary.500"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      shadow={2}
    >
      <VStack space={4} alignItems="center">
        <HStack space={2}>
          <Heading>Dashboard</Heading>
        </HStack>
        <Heading>Accounting</Heading>
        <Pressable onPress={() => console.log("hello world")}>
          <Badge p="3">15 members</Badge>
        </Pressable>

        <ButtonComponent navigation={navigation} name="jon"></ButtonComponent>

      </VStack>
    </Box>
  );
}
