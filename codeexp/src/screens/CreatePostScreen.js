import { Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const CreatePostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreatePostScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreatePostScreen;
