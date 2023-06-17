import { useEffect, useState } from "react";
import { Box, Text, Image, VStack, FlatList, View } from "native-base";
import { database, storage } from "../Firebase";
import { ref as createDatabaseRef, onValue } from "firebase/database";
import { ref as createStorageRef, getDownloadURL } from "firebase/storage";

const PostComponent = ({ title, content, imageURL, comments }) => {
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
      </VStack>
    </Box>
  );
};

const testList = [
  {
    id: 1,
    title: "Some Title1",
    content: "Some Content1",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Jamal_Murray_free_throw_%28cropped%29.jpg",
    comments: [],
  },
  {
    id: 2,
    title: "Some Title2",
    content: "Some Content2",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Jamal_Murray_free_throw_%28cropped%29.jpg",
    comments: [],
  },
];

const ViewPostsScreen = () => {
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
          const { imageStoragePath, postContent, postTitle, postDate, userId } = childData;
          // Get the Image
          const storageRef = createStorageRef(storage, imageStoragePath);
          try {
            const url = await getDownloadURL(storageRef);
            // Add to list
            setPostsList((prevList) => {
              return [
                ...prevList,
                { postId: childKey, userId, postTitle, postContent, postDate, imageURL: url },
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
            title={item.postTitle}
            content={item.postContent}
            imageURL={item.imageURL}
            userId={item.userId}
            comments={item.comments}
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
