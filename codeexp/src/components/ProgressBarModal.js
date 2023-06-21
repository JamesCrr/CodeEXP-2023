import { Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { PresenceTransition, Modal, Text, Box, IconButton, Icon, HStack } from "native-base";

import { useAppContext, useAppDispatchContext } from "../AppProvider";

const ProgressBarModal = () => {
  const { questModalVisible, questModalTitle, questModalContent } = useAppContext();
  const dispatch = useAppDispatchContext();

  return (
    // <Modal isOpen={questModalVisible}>
    <Box padding={2} position={"absolute"} bottom={16} width={"100%"} zIndex={questModalVisible ? 1 : -10}>
      <PresenceTransition
        visible={questModalVisible}
        initial={{
          translateY: 300,
        }}
        animate={{
          translateY: 0,
          transition: {
            duration: 900,
          },
        }}
      >
        <Box bg={"warmGray.300"} marginX={2} padding={2} borderRadius={10}>
          <HStack justifyContent={"space-between"} marginBottom={4}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Quest Completed!
            </Text>
            <IconButton
              // borderWidth={1}
              icon={<Icon as={Entypo} name="cross" />}
              size={7}
              _icon={{
                color: "orange.500",
                size: "2xl",
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
                translateX: -400,
              }}
              animate={{
                translateX: 0,
                transition: {
                  duration: 1500,
                },
              }}
            >
              <Box bg={"primary.400"} padding={2}></Box>
            </PresenceTransition>
          </Box>
        </Box>
      </PresenceTransition>
    </Box>
    // </Modal>
  );
};
export default ProgressBarModal;
