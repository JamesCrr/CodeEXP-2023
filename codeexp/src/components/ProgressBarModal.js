import { Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { PresenceTransition, Modal, Text, Box, IconButton, Icon, HStack } from "native-base";

import { useAppContext, useAppDispatchContext } from "../AppProvider";

const ProgressBarModal = () => {
  const { questModalVisible, questModalTitle, questModalContent } = useAppContext();
  const dispatch = useAppDispatchContext();

  return (
    // <Modal isOpen={questModalVisible}>
    <Box padding={2} position={"absolute"} bottom={16} width={"100%"}>
      <PresenceTransition
        visible={questModalVisible}
        initial={{
          translateY: 400,
        }}
        animate={{
          translateY: 0,
          transition: {
            duration: 600,
          },
        }}
      >
        <Box bg={"red.200"} marginX={2} padding={2}>
          <HStack justifyContent={"space-between"} marginBottom={4}>
            <Text>Quest Completed!</Text>
            <IconButton
              // borderWidth={1}
              icon={<Icon as={Entypo} name="cross" />}
              size={7}
              _icon={{
                color: "orange.500",
                size: "lg",
              }}
              onPress={() => {
                dispatch({
                  type: "setQuestModal",
                  val: { questModalVisible: false, questModalTitle, questModalContent },
                });
              }}
            />
          </HStack>
          <Box overflow={"hidden"}>
            <PresenceTransition
              visible={questModalVisible}
              initial={{
                translateX: -300,
              }}
              animate={{
                translateX: 0,
                transition: {
                  duration: 900,
                },
              }}
            >
              <Box bg={"blue.700"} padding={2}></Box>
            </PresenceTransition>
          </Box>
        </Box>
      </PresenceTransition>
    </Box>
    // </Modal>
  );
};
export default ProgressBarModal;
