import { useState } from "react";
import { Box, Divider, HStack, Input, Pressable, ScrollView, Text } from "native-base";
import { ref as createDatabaseRef, child, push, update } from "firebase/database";
import { database } from "../Firebase";

const CommentComponent = ({ username, commentContent }) => {
  return (
    <Box padding={1} marginY={1}>
      <Text fontWeight={"bold"}>{username}</Text>
      <Text>{commentContent}</Text>
    </Box>
  );
};

const testComments = [
  {
    username: "@sadsd",
    commentContent: "asdsadsadsdadsadsadsadsadsadsad",
  },
  {
    username: "@zczxcxc",
    commentContent: "kosadjlkjsadsajdlkjdj",
  },
];

const PostCommentsScreen = ({ route, navigation }) => {
  const { username, postId, title, content, comments } = route.params;
  const [commentList, setCommentList] = useState(comments ? comments : []);
  const [commentInput, setCommentInput] = useState("");

  /**
   * When the users wants to post their comment
   */
  const postMessageCommentHandler = () => {
    if (commentInput.trim() === "") {
      return;
    }
    const newCommentsData = [...commentList, { username, commentContent: commentInput }];
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
      return [...prevList, { username, commentContent: commentInput }];
    });
    // Reset Comment Input
    console.log("Posted Comment: ", commentInput);
    setCommentInput("");
  };

  return (
    <Box height={"100%"} width={"100%"}>
      <Box paddingX={2} paddingY={2}>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Divider my={2} height={1} bg={"orange.500"} />
        <ScrollView>
          {commentList.length > 0 ? (
            commentList.map((ele, index) => {
              const { username, commentContent } = ele;
              const key = `${username}+${index}`;
              return <CommentComponent key={key} username={username} commentContent={commentContent} />;
            })
          ) : (
            <Text alignSelf={"center"}>No comments yet!</Text>
          )}
        </ScrollView>
      </Box>

      <Box position={"absolute"} bottom={0} bg={"gray.400"} width={"100%"}>
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
