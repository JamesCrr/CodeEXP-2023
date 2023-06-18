import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ViewPostsStack from "./ViewPostsStack";
import UserAccountScreen from "./UserAccountScreen";
import CreatePostScreen from "./CreatePostScreen";

const BottomTab = createBottomTabNavigator();
const UserStack = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <BottomTab.Screen
        name="ViewPostsStack"
        component={ViewPostsStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="LeaderboardScreen"
        component={ViewPostsStack}
        options={{
          tabBarLabel: "Leaderboard",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-podium" color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="add" color={color} size={size} />,
          tabBarShowLabel: false,
          tabBarLabel: "",
        }}
      />
      <BottomTab.Screen
        name="QuestsScreen"
        component={ViewPostsStack}
        options={{
          tabBarLabel: "Quests",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="tasks" color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="UserAccountScreen"
        component={UserAccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" color={color} size={size} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
export default UserStack;
