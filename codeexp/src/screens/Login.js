import { ButtonComponent } from "../components/ButtonComponent";
import { VStack, Center,Container,Heading,Text} from "native-base";

export default function Profile({ navigation }) {
  return (
    // <VStack space={4} alignItems="center">
    //   <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
    //   <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
    //   <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
    //   <ButtonComponent navigation={navigation} name="jon"></ButtonComponent>
    // </VStack>
    <Center>
      <Container>
        <Heading>
          A component library for the
          <Text color="emerald.500"> React Ecosystem</Text>
        </Heading>
        <Text mt="3" fontWeight="medium">
          NativeBase is a simple, modular and accessible component library that
          gives you building blocks to build you React applications.
        </Text>
      </Container>
    </Center>
  );
}
