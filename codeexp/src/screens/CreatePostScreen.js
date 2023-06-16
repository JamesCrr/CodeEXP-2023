import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Input, Stack, TextArea, Pressable, Image, ScrollView, Text, Button } from "native-base";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpLEaypKRTTzDJyvNVBFTW65qJtSgIdo8",
  authDomain: "code-exp-borrowbuddy.firebaseapp.com",
  databaseURL: "https://code-exp-borrowbuddy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "code-exp-borrowbuddy",
  storageBucket: "code-exp-borrowbuddy.appspot.com",
  messagingSenderId: "952131407797",
  appId: "1:952131407797:web:a52fd81aed2aa49ef2d3fc",
  measurementId: "G-BHTXRF3ND9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const appWidth = "90%";
const CreatePostScreen = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [validPost, setValidPost] = useState(false);
  const [image, setImage] = useState(undefined);

  // useEffect(() => {
  //   const pathRef = ref(storage, "myImageName");
  //   getDownloadURL(pathRef)
  //     .then((url) => {
  //       setImage(url);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.log(error);
  //     });
  // }, []);

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
  const onSubmitPostHandler = async () => {
    // console.log("Submitted!", postTitle, postContent, image);

    // Create the Image Blob
    const response = await fetch(image);
    const blob = await response.blob();
    // 'file' comes from the Blob or File API
    const storageRef = ref(storage, "myImageName");
    try {
      const uploadedSnapshot = await uploadBytes(storageRef, blob);
      // console.log(uploadedSnapshot);
      console.log("Uploaded a blob or file!");
    } catch (error) {
      console.log(error.message);
    }

    // Reset Inputs
    setPostTitle("");
    setPostContent("");
    setValidPost(false);
    setImage(undefined);
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
              if (validPost) {
                if (text.trim() === "") {
                  setValidPost(false);
                }
              } else {
                if (text.trim() !== "" && postContent.trim() !== "") {
                  setValidPost(true);
                }
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
              if (validPost) {
                if (text.trim() === "") {
                  setValidPost(false);
                }
              } else {
                if (text.trim() !== "" && postTitle.trim() !== "") {
                  setValidPost(true);
                }
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
          // isDisabled={!validPost}
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
