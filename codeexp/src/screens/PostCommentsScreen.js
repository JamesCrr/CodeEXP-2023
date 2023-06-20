import { useState } from "react";
import { Box, Divider, HStack, Image, Input, Pressable, ScrollView, Text } from "native-base";
import { database } from "../Firebase";
import { ref as createDatabaseRef, child, push, update } from "firebase/database";
import { useAppContext } from "../AppProvider";
import ReturnButton from "../components/ReturnButton";

const CommentComponent = ({ username, commentContent }) => {
  return (
    <Box padding={1} marginY={1}>
      <Text fontSize={"md"} fontWeight={"bold"}>
        @{username}
      </Text>
      <Text>{commentContent}</Text>
    </Box>
  );
};

const PostCommentsScreen = ({ route, navigation }) => {
  const { userInfo } = useAppContext();
  const { postId, title, content, comments, imageURL } = route.params;
  const [commentList, setCommentList] = useState(comments ? comments : []);
  const [commentInput, setCommentInput] = useState("");

  /**
   * When the users wants to post their comment
   */
  const postMessageCommentHandler = () => {
    if (commentInput.trim() === "") {
      return;
    }
    const newCommentsData = [...commentList, { username: userInfo.username, commentContent: commentInput }];
    try {
      const CommentsPath = `UserPosts/PostData/${postId}/comments`;
      const updates = {};
      updates[CommentsPath] = newCommentsData;
      // console.log("Comment Path: ", CommentsPath);
      update(createDatabaseRef(database), updates);
    } catch (error) {
      console.log(error.message);
    }
    // Add to existing comment list
    setCommentList((prevList) => {
      return [...prevList, { username: userInfo.username, commentContent: commentInput }];
    });
    // Reset Comment Input
    console.log("Posted Comment: ", commentInput);
    setCommentInput("");
  };

  return (
    <Box height={"100%"} width={"100%"}>
      <ScrollView>
        <Box paddingX={2} paddingY={2}>
          {imageURL && (
            <Image
              source={{
                uri: imageURL,
              }}
              alt={"altText"}
              width={imageURL ? "md" : "0"}
              height={imageURL ? "md" : "0"}
              resizeMode={"cover"}
              borderWidth={1}
              borderColor={"black"}
              borderRadius={12}
            />
          )}
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {title}
          </Text>
          <Text>{content}</Text>
          <Divider my={2} height={1} bg={"orange.500"} />

          {commentList.length > 0 ? (
            commentList.map((ele, index) => {
              const { username, commentContent } = ele;
              const key = `${username}+${index}+${commentContent.slice(
                0,
                Math.min(3, commentContent.length)
              )}`;
              // console.log(key);
              return <CommentComponent key={key} username={username} commentContent={commentContent} />;
            })
          ) : (
            <Text alignSelf={"center"}>No comments yet!</Text>
          )}
        </Box>
      </ScrollView>

      <Box bg={"gray.400"} width={"100%"}>
        <HStack justifyContent={"space-between"} paddingY={2}>
          <Input
            bg={"white"}
            value={commentInput}
            placeholder="Your comment"
            marginLeft={3}
            flexGrow={20}
            onChangeText={(text) => setCommentInput(text)}
            _focus={{ bg: "white" }}
          />
          <Pressable
            onPress={postMessageCommentHandler}
            borderWidth={1}
            alignSelf={"center"}
            marginX={2}
            flexGrow={1}
          >
            <Text textAlign={"center"}>Post Comment</Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
};
export default PostCommentsScreen;
