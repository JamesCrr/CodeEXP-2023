import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Input, Stack, TextArea, Pressable } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";

const CreatePostScreen = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const onSelectImageHandler = () => {
    console.log("Pressed!");
  };

  return (
    <Box alignItems="center" w="100%" h={"100%"} marginTop={5}>
      <Stack w="90%" space={"md"}>
        <Input
          size={"md"}
          placeholder="Post Title"
          onChangeText={(text) => {
            setPostTitle(text);
          }}
        />
        <TextArea
          h={400}
          placeholder="Post Content"
          onChangeText={(text) => {
            setPostContent(text);
          }}
        />
      </Stack>
      <HStack
        space={"md"}
        w="90%"
        // borderWidth={"1"}
        // borderColor={"red"}
        justifyContent={"flex-start"}
        marginTop={2}
      >
        <Pressable onPress={onSelectImageHandler}>
          <MaterialIcons name="image" size={35} color="black" />
        </Pressable>
      </HStack>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreatePostScreen;
