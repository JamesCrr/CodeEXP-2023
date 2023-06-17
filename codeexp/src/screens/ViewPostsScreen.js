import { Box, Text, Image, VStack, FlatList, View } from "native-base";

const PostComponent = ({ title, content, imageURL, comments }) => {
  return (
    <Box margin={2} borderWidth={2} flexGrow={1}>
      <VStack space={"sm"} margin={2}>
        <Text>{title}</Text>
        <Image
          source={{
            uri: imageURL,
          }}
          alt={"altText"}
          width={"xs"}
          height={"xs"}
          resizeMode={"contain"}
        />
        <Text>{content}</Text>
      </VStack>
    </Box>
  );
};

const ViewPostsScreen = () => {
  const testList = [
    {
      id: 1,
      title: "Some Title1",
      content: "Some Content1",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Jamal_Murray_free_throw_%28cropped%29.jpg",
      comments: [],
    },
    {
      id: 2,
      title: "Some Title2",
      content: "Some Content2",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Jamal_Murray_free_throw_%28cropped%29.jpg",
      comments: [],
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  return (
    <View flex={1}>
      <FlatList
        data={testList}
        renderItem={({ item }) => (
          <PostComponent
            title={item.title}
            content={item.content}
            imageURL={item.imageURL}
            comments={item.comments}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={3}
      />
      <Box borderWidth={1} pt={7}>
        Bottom Tab here
      </Box>
    </View>
  );
};
export default ViewPostsScreen;
