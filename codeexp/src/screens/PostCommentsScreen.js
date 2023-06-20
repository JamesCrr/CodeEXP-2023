import { useState } from "react";
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  Flex,
  Spacer,
} from "native-base";
import { database } from "../Firebase";
import {
  ref as createDatabaseRef,
  child,
  push,
  update,
} from "firebase/database";
import { useAppContext } from "../AppProvider";
import ReturnButton from "../components/ReturnButton";

const CommentComponent = ({ username, commentContent }) => {
  return (
    <Box
      padding={1}
      marginY={1}
      borderBottomWidth={1}
      borderBottomColor="black"
    >
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

  /*
    When the users wants to post their comment
   */
  const postMessageCommentHandler = () => {
    if (commentInput.trim() === "") {
      return;
    }
    const newCommentsData = [
      ...commentList,
      { username: userInfo.username, commentContent: commentInput },
    ];
    try {
      const CommentsPath = `UserPosts/PostData/${postId}/comments`;
      const updates = {};
      updates[CommentsPath] = newCommentsData;
      /* console.log("Comment Path: ", CommentsPath); */
      update(createDatabaseRef(database), updates);
    } catch (error) {
      console.log(error.message);
    }
    /* Add to existing comment list */
    setCommentList((prevList) => {
      return [
        ...prevList,
        { username: userInfo.username, commentContent: commentInput },
      ];
    });
    /* Reset Comment Input */
    console.log("Posted Comment: ", commentInput);
    setCommentInput("");
  };

  return (
    <Box height={"100%"} width={"100%"}>
      <ScrollView>
        <Flex direction="row" alignItems="flex-start" pl={1}>
          <ReturnButton customStyle={{ marginLeft: 10, marginTop: 10 }} />
        </Flex>
        <Box
          paddingX={2}
          paddingY={2}
          borderWidth={1}
          width={"90%"}
          alignSelf={"center"}
        >
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
              return (
                <CommentComponent
                  key={key}
                  username={username}
                  commentContent={commentContent}
                />
              );
            })
          ) : (
            <Text alignSelf={"center"}>No comments yet!</Text>
          )}
        </Box>
        <Spacer m="35" />
      </ScrollView>

      <Box
        position={"absolute"}
        bottom={0}
        bg={"background.400"}
        width={"100%"}
      >
        <HStack justifyContent={"space-between"} paddingY={2}>
          <Input
            bg={"primary.500"}
            value={commentInput}
            placeholder="Your comment here"
            placeholderTextColor={"white"}
            marginLeft={3}
            flexGrow={20}
            borderRadius={"full"}
            onChangeText={(text) => setCommentInput(text)}
            _focus={{ bg: "white" }}
          />
          <Pressable
            height={30}
            width={60}
            onPress={postMessageCommentHandler}
            alignSelf={"center"}
            marginX={2}
            flexGrow={1}
            borderRadius={"full"}
            bg={"primary.500"}
          >
            <Text textAlign={"center"} fontSize={10} color={"white"} top={1.5}>
              Comment
            </Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
};
export default PostCommentsScreen;
