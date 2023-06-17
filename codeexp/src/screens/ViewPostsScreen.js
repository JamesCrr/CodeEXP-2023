import { useEffect, useState } from "react";
import { Box, Text, Image, VStack, FlatList, View, Pressable } from "native-base";
import { database, storage } from "../Firebase";
import { ref as createDatabaseRef, onValue } from "firebase/database";
import { ref as createStorageRef, getDownloadURL } from "firebase/storage";

const PostComponent = ({ username, postId, title, content, imageURL, comments, navigation }) => {
  let haveS = true;
  if (comments && comments.length == 1) {
    haveS = false;
  }
  return (
    <Box margin={2} borderWidth={2} flexGrow={1}>
      <VStack space={"sm"} margin={2}>
        <Text color={"black"}>{title}</Text>
        <Image
          source={{
            uri: imageURL,
          }}
          alt={"altText"}
          width={"md"}
          height={"md"}
          resizeMode={"cover"}
        />
        <Text color={"black"}>{content}</Text>
        {/* Navigate to view comment screen */}
        <Pressable
          onPress={() =>
            navigation.navigate("PostCommentsScreen", { username, postId, title, content, comments })
          }
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

  useEffect(() => {
    // Fetch the Posts from Firebase
    const postListRef = createDatabaseRef(database, "UserPosts/PostData");
    onValue(postListRef, (snapshot) => {
      const UpdatePostList = async () => {
        // Reset the posts
        setPostsList([]);
        // Loop through the fetched data and add them to the list
        snapshot.forEach(async (childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          // Destructure the data
          const { imageStoragePath, postContent, postTitle, postDate, userId, comments } = childData;
          // Get the Image
          const storageRef = createStorageRef(storage, imageStoragePath);
          try {
            const url = await getDownloadURL(storageRef);
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
      };
      // Call the function
      UpdatePostList();
    });
  }, []);

  // console.log(postsList);
  return (
    <View flex={1}>
      <FlatList
        data={postsList}
        renderItem={({ item }) => (
          <PostComponent
            username={"GET USERNAME FROM ACC"}
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
      <Box borderWidth={1} pt={7}>
        Bottom Tab here
      </Box>
    </View>
  );
};
export default ViewPostsScreen;
