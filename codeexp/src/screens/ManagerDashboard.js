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

export default function ManagerDashboard({ navigation }) {
  return (
    <Box
      p="2"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      shadow={2}
    >
      <VStack bg="primary.500" space={4} alignItems="center">
        <HStack space={2}>
          <Heading>Dashboard</Heading>
        </HStack>
        <Heading>Accounting</Heading>
        <Pressable onPress={() => console.log("hello world")}>
          <Badge p="3">15 members</Badge>
        </Pressable>

        <ButtonComponent navigation={navigation} name="jon"></ButtonComponent>
      </VStack>
      <VStack space={4} p="6" alignItems="center">
        <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
        <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
        <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
      </VStack>
      ;
    </Box>
  );
}
