import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Input, Stack, TextArea, Pressable, Image, ScrollView, Text, Button } from "native-base";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const appWidth = "90%";

const CreatePostScreen = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [validPost, setValidPost] = useState(false);
  const [image, setImage] = useState(undefined);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  /**
   * When user wants to removes the selected image
   */
  const onRemoveSelectedImageHandler = () => {
    setImage(undefined);
  };
  /**
   * When user wants to select an image to attach
   */
  const onSelectImageHandler = () => {
    pickImage();
  };
  /**
   * When user wants to submit their post
   */
  const onSubmitPostHandler = () => {
    console.log("Submitted!");
  };

  return (
    <ScrollView h={"200"}>
      <Box alignItems="center" w="100%" h="100%" marginTop={5}>
        {/* Title & Content & Selected Image (if have) */}
        <Stack w={appWidth} space={"sm"}>
          <Input
            size={"md"}
            placeholder="Post Title"
            onChangeText={(text) => {
              setPostTitle(text);
              if (text.trim() !== "" && postContent.trim() !== "") {
                setValidPost(true);
              } else {
                setValidPost(false);
              }
            }}
          />
          {image && (
            <Box w={"auto"} h={80}>
              <Image
                source={{
                  uri: image,
                }}
                alt={"altText"}
                resizeMode={"cover"}
                size={"100%"}
              />
              <Pressable
                onPress={onRemoveSelectedImageHandler}
                alignSelf={"center"}
                position={"absolute"}
                right={"2"}
                top={"2"}
              >
                <MaterialIcons name="cancel" size={30} color="black" />
              </Pressable>
            </Box>
          )}
          <TextArea
            h={400}
            placeholder="Post Content"
            onChangeText={(text) => {
              setPostContent(text);
              if (text.trim() !== "" && postTitle.trim() !== "") {
                setValidPost(true);
              } else {
                setValidPost(false);
              }
            }}
          />
        </Stack>
        {/* Icon Buttons to attach things */}
        <HStack
          space={"md"}
          w={appWidth}
          // borderWidth={"1"}
          // borderColor={"red"}
          justifyContent={"flex-start"}
          marginTop={2}
        >
          {/* Render the color differently if there is already an image attached */}
          <Pressable onPress={onSelectImageHandler} isDisabled={image != undefined}>
            {image != undefined ? (
              <MaterialIcons name="image" size={35} color="grey" />
            ) : (
              <MaterialIcons name="image" size={35} color="black" />
            )}
          </Pressable>
        </HStack>
        {/* Submit Post Button */}
        <Pressable
          width={"70%"}
          backgroundColor={validPost ? "orange.100" : "warmGray.600"}
          borderRadius={2}
          onPress={onSubmitPostHandler}
          padding={2}
          marginY={12}
          isDisabled={!validPost}
        >
          <Text fontWeight={"bold"} fontSize={18} textAlign={"center"}>
            Submit
          </Text>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

export default CreatePostScreen;
