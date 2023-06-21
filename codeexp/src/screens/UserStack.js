import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ViewPostsStack from "./ViewPostsStack";
import UserAccountScreen from "./UserAccountScreen";
import CreatePostScreen from "./CreatePostScreen";
import ViewQuests from "./ViewQuests";
import UserLeaderboard from "./UserLeaderboard";

import { useTheme } from "native-base";

const BottomTab = createBottomTabNavigator();
const UserStack = () => {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: colors["primary"][200]}}>
      <BottomTab.Screen
        name="ViewPostsStack"
        component={ViewPostsStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size= {size} />,
        }}
      />
      <BottomTab.Screen
        name="LeaderboardScreen"
        component={UserLeaderboard}
        options={{
          tabBarLabel: "Leaderboard",
          tabBarIcon: ({ color, size }) => <Ionicons name="podium-outline" color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ color, size }) => 
          // <MaterialIcons name="add" color={color} size={size} 
          <Ionicons name="add-circle-outline" color={color} size={30}/>,
          tabBarShowLabel: false,
          tabBarLabel: "",
        }} 
      />
      <BottomTab.Screen
        name="QuestsScreen"
        component={ViewQuests}
        options={{
          tabBarLabel: "Quests",
          tabBarIcon: ({ color, size }) => 
          //<FontAwesome5 name="tasks" color={color} size={size}
          <Ionicons name="list-circle-outline" color={color} size={30}/>
        }}
      />
      <BottomTab.Screen
        name="UserAccountScreen"
        component={UserAccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => 
          // <MaterialIcons name="person-circle-outline" color={color} size={30} />,
          <Ionicons name="person-circle-outline" color={color} size={30} />
        }}
      />
    </BottomTab.Navigator>
  );
};
export default UserStack;
