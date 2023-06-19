import { Modal, Button, Text, Box, Image, VStack } from "native-base";
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const AchievementModal = () => {
  const { achievementModalDetails, achievementModalVisible } = useAppContext();
  const { title, about, imageUri } = achievementModalDetails;
  const dispatch = useAppDispatchContext();

  return (
    <Modal isOpen={achievementModalVisible}>
      <Modal.Content>
        {/* <Modal.CloseButton /> */}
        <Modal.Header>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <VStack marginBottom={4}>
            <Image
              alignSelf={"center"}
              source={{
                uri: imageUri,
              }}
              alt={"altText"}
              width={100}
              height={100}
              resizeMode={"cover"}
            />
            <Text textAlign={"center"} fontSize={"lg"}>
              {about}
            </Text>
            <Text textAlign={"center"} fontSize={"xs"}>
              86.4% of people
            </Text>
          </VStack>
          <Button
            flex="1"
            onPress={() => {
              dispatch({
                type: "setNewAchievementModal",
                val: { newNotify: false, isVisible: false, modalDetails: {} },
              });
            }}
          >
            Nice!
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
export default AchievementModal;
