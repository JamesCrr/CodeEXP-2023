import { useEffect, useState } from "react";
import { Box, Text, Image, HStack, VStack, FlatList, View, Pressable, Spinner } from "native-base";
import { database, storage } from "../Firebase";
import { ref as createDatabaseRef, onValue } from "firebase/database";
import { ref as createStorageRef, getDownloadURL } from "firebase/storage";
import { useAppContext, useAppDispatchContext } from "../AppProvider";

const PostComponent = ({ postId, title, content, imageURL, comments, navigation }) => {
  let haveS = true;
  if (comments && comments.length == 1) {
    haveS = false;
  }
  return (
    <Box margin={2} borderWidth={2} flexGrow={1} safeArea>
      <VStack space={"sm"} margin={2}>
        <Text color={"black"}>{title}</Text>
        <Image
          source={{
            uri: imageURL,
          }}
          alt={"altText"}
          width={imageURL ? "md" : "0"}
          height={imageURL ? "md" : "0"}
          resizeMode={"cover"}
        />
        <Text color={"black"}>{content}</Text>
        {/* Navigate to view comment screen */}
        <Pressable
          onPress={() => navigation.navigate("PostCommentsScreen", { postId, title, content, comments })}
        >
          <Text>
            View{comments ? ` ${comments.length}` : ""} comment{haveS ? "s" : ""}
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
};

const ViewPostsScreen = ({ route, navigation }) => {
  const [postsList, setPostsList] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const { userInfo, completedQuestId, newAchievementNotify } = useAppContext();
  // console.log("UID " + uid);
  // console.log("QUEST " + completedQuestId);

  useEffect(() => {
    // Fetch the Posts from Firebase
    const postListRef = createDatabaseRef(database, "UserPosts");
    onValue(
      postListRef,
      (snapshot) => {
        // Async Function to get all the posts from Firebase
        const UpdatePostList = async () => {
          // Reset the posts
          setPostsList([]);

          const data = snapshot.val(); // Retrieve the data from the snapshot
          const dataList = Object.entries(data["PostData"]); // Convert the data object into an array
          // Process the dataList as needed
          // console.log("List:", dataList);
          dataList.forEach(async (val, index) => {
            // console.log(val, index);
            const childKey = val[0];
            const childData = val[1];
            // console.log("Key:", childKey);
            // console.log("Data:", childData);
            // Destructure the data
            const { imageStoragePath, postContent, postTitle, postDate, userId, comments } = childData;

            // Is there an Image?
            let storageRef = imageStoragePath ? createStorageRef(storage, imageStoragePath) : undefined;
            try {
              const url = storageRef ? await getDownloadURL(storageRef) : undefined;
              // Add to list
              setPostsList((prevList) => {
                return [
                  ...prevList,
                  { postId: childKey, userId, postTitle, postContent, postDate, imageURL: url, comments },
                ];
              });
            } catch (error) {
              // Handle any errors
              console.log(error);
            }
          });

          // // Loop through the fetched data and add them to the list
          // snapshot.forEach(async (childSnapshot) => {
          //   const childKey = childSnapshot.key;
          //   const childData = childSnapshot.val();
          //   console.log("Key:", childKey);
          //   // Destructure the data
          //   const { imageStoragePath, postContent, postTitle, postDate, userId, comments } = childData;
          //   // Get the Image
          //   const storageRef = createStorageRef(storage, imageStoragePath);
          //   try {
          //     const url = await getDownloadURL(storageRef);
          //     // Add to list
          //     setPostsList((prevList) => {
          //       return [
          //         ...prevList,
          //         { postId: childKey, userId, postTitle, postContent, postDate, imageURL: url, comments },
          //       ];
          //     });
          //   } catch (error) {
          //     // Handle any errors
          //     console.log(error);
          //   }
          // });

          // Posts no longer loading
          setPostsLoading(false);
        };

        // Call the function after 1s delay
        setTimeout(UpdatePostList, 200);
      },
      {
        onlyOnce: false,
      }
    );
  }, []);

  // console.log(postsList);
  return (
    <View flex={1}>
      {postsLoading ? (
        <HStack space={2} justifyContent="center" height={"100%"} alignItems={"center"}>
          <Spinner accessibilityLabel="Loading posts" size={"lg"} />
          <Text color="primary.500" fontSize="md" textAlign={"center"} fontWeight={"bold"}>
            Loading
          </Text>
        </HStack>
      ) : (
        <FlatList
          data={postsList}
          renderItem={({ item }) => (
            <PostComponent
              postId={item.postId}
              userId={item.userId}
              title={item.postTitle}
              content={item.postContent}
              imageURL={item.imageURL}
              comments={item.comments}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.postId}
          initialNumToRender={3}
        />
      )}
    </View>
  );
};
export default ViewPostsScreen;
