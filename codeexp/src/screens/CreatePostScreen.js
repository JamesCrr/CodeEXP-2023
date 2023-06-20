import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Input, Stack, TextArea, Pressable, Image, ScrollView, Text } from "native-base";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

// Import the functions you need from the SDKs you need
import { storage, database, firestore } from "../Firebase";
import { ref as createDatabaseRef, set, push } from "firebase/database";
import { ref as createStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const appWidth = "90%";
const CreatePostScreen = ({ route, navigation }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [validPost, setValidPost] = useState(false);
  const [image, setImage] = useState(undefined);

  const { userInfo, completedQuestId } = useAppContext();
  const dispatch = useAppDispatchContext();
  const uid = userInfo.uid;
  const [updateQuestBlock, setUpdateQuestBlock] = useState([]);
  // console.log("Completed Quest Id: ", completedQuestId.id, "UID: ", userInfo.uid);
  // console.log("All Quests: ", allQuests);

  // useEffect(() => {
  //   const pathRef = createStorageRef(storage, "UserPostAttachments/myImageName");
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

    // console.log(result);
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

    /** Set a loading state for the Submit Button? */
    // 1. Create a Loading useState()
    // 2. Change Pressable to Button to use their isLoading State
    /***********************************************/
    // Store Post in Firebase Realtime Database
    try {
      const postListRef = createDatabaseRef(database, "UserPosts/PostData");
      const newPostRef = push(postListRef);
      const userRef = doc(firestore, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        // console.log("Document data:", userSnap);
      } else {
        console.log("No such document!");
      }
      const userData = userSnap.data();

      // Quests & achievements
      let updatedAchievements = userData.achievements;
      // Quests
      let currencyAwarded = 0;
      let updatedAllQuests = [];
      if (userData.socialQuest) {
        updatedAllQuests = [...userData.socialQuest];
        // console.log("Updated All Quests: ", updatedAllQuests);

        // Find the Quest to complete
        for (let i = 0; i < updatedAllQuests.length; i++) {
          const { completed, questsId } = updatedAllQuests[i];
          // console.log("completedquestId: ", completedQuestId);
          if (questsId == completedQuestId) {
            updatedAllQuests[i].completed = true;

            /**
             * Aysnc Function that fetches the Achievement Data
             */
            const fetchAchievementData = async () => {
              const achRef = doc(firestore, "user_achievements", "Starting Your Journey!");
              const achSnap = await getDoc(achRef);
              if (achSnap.exists()) {
              } else {
                console.log("No such document!");
              }
              const achData = achSnap.data();

              // Fetch the image
              let storageRef = createStorageRef(storage, achData.imageStoragePath);
              let actualUri = "";
              try {
                actualUri = await getDownloadURL(storageRef);
              } catch (error) {
                // Handle any errors
                console.log(error);
              }

              // Set context to prompt achievement modal in account screen
              dispatch({
                type: "setNewAchievementModal",
                val: {
                  newAchievementNotify: true,
                  achievementModalVisible: false,
                  achievementModalDetails: {
                    title: "Starting Your Journey!",
                    about: achData.about,
                    imageUri: actualUri,
                  },
                },
              });
            };
            // Fetch the achievement
            fetchAchievementData();

            // Set context to add achievements to userInfo, if not added before
            if (userInfo.achievements.length <= 0) {
              dispatch({
                type: "setUserAchievements",
                val: ["Starting Your Journey!"],
              });
              // Also update firestore
              updatedAchievements = ["Starting Your Journey!"];
            }
            break;
          }
        }
      }
      // Add Post History
      let newPostHistory = [...userData.postHistory, newPostRef.key];

      // Update the Firestore
      try {
        // console.log("TRYING TO UPDATE", updatedAllQuests);
        await updateDoc(userRef, {
          socialQuest: updatedAllQuests,
          postHistory: newPostHistory,
          achievements: updatedAchievements,
          currency: parseInt(userData.currency) + parseInt(currencyAwarded),
        });
        // console.log("UPDATED");
      } catch (error) {
        console.log("Error updating", error);
      }

      // Store the Image in Firebase Storage
      // Create the Image Blob
      const imageStoragePath = `UserPostAttachments/${newPostRef.key}.jpg`;
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        // Get Storage Ref
        const storageRef = createStorageRef(storage, imageStoragePath);
        try {
          // Upload to Firebase
          const uploadedSnapshot = await uploadBytes(storageRef, blob);
          console.log("Uploaded the Image Blob!");
        } catch (error) {
          console.log(error.message);
        }
      }

      const currentDate = new Date();
      // set(newPostRef, {
      //   userId: uid,
      //   postTitle,
      //   postContent,
      //   postDate: currentDate.toString(),
      //   imageStoragePath: image ? imageStoragePath : null,
      // });
      console.log("Post Uploaded to Realtime Database");
    } catch (error) {
      console.log(error.message);
    }

    // Reset Inputs
    setPostTitle("");
    setPostContent("");
    setValidPost(false);
    setImage(undefined);

    // Navigate to ViewPostsStack
    navigation.replace("UserStack", { screen: "ViewPostsStack" });
  };

  return (
    <ScrollView h={"200"}>
      <Box alignItems="center" w="100%" h="100%" marginTop={5} safeArea>
        {/* Title & Content & Selected Image (if have) */}
        <Stack w={appWidth} space={"sm"}>
          <Input
            size={"md"}
            fontWeight={"bold"}
            placeholder="Post Title"
            value={postTitle}
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
            value={postContent}
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
        <HStack space={"md"} w={appWidth} justifyContent={"flex-start"} marginTop={2}>
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
