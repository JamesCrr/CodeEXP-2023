import { createStackNavigator } from "@react-navigation/stack";
import ViewPostsScreen from "./ViewPostsScreen";
import PostCommentsScreen from "./PostCommentsScreen";

const VPStack = createStackNavigator();
const ViewPostsStack = () => {
  return (
    <VPStack.Navigator screenOptions={{ headerShown: true }}>
      <VPStack.Screen name="ViewPostsScreen" component={ViewPostsScreen} />
      {/* <VPStack.Screen name="PostCommentsScreen" component={PostCommentsScreen} /> */}
    </VPStack.Navigator>
  );
};
export default ViewPostsStack;

// https://reactnavigation.org/docs/screen-options-resolution/
// https://reactnavigation.org/docs/hiding-tabbar-in-screens
