import { firestore, database, storage } from "../Firebase";
import { ref as createDatabaseRef, onValue } from "firebase/database";
import { ref as createStorageRef, getDownloadURL } from "firebase/storage";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  Divider,
  Button,
  Icon,
} from "native-base";
import { useState, useEffect } from "react";
import { useAppContext, useAppDispatchContext } from "../AppProvider";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const HistoryTab = ({ data, currDate }) => {
  /**
   * Find the time difference between 2 dates
   * @param {Date} d1
   * @param {Date} d2
   * @returns
   */
  const getDateDiff = (d1, d2) => {
    var diff = d2 - d1;
    return isNaN(diff)
      ? NaN
      : {
          diff: diff,
          ms: Math.floor(diff % 1000),
          s: Math.floor((diff / 1000) % 60),
          m: Math.floor((diff / 60000) % 60),
          h: Math.floor((diff / 3600000) % 24),
          d: Math.floor(diff / 86400000),
        };
  };

  return (
    <Box flex={1}>
      <ScrollView>
        <VStack space={2}>
          {data.length > 0 ? (
            data.map((ele, index) => {
              // console.log(ele);
              const dateDiff = getDateDiff(ele.isPost ? ele.postDate : ele.postDate, currDate);
              let dateDiffStr = "";
              if (dateDiff.d > 0) {
                dateDiffStr = `${dateDiff.d}d ago`;
              } else if (dateDiff.h > 0) {
                dateDiffStr = `${dateDiff.h}hr ago`;
              } else if (dateDiff.m > 0) {
                dateDiffStr = `${dateDiff.m}min ago`;
              } else if (dateDiff.s > 0) {
                dateDiffStr = `${dateDiff.s}s ago`;
              }

              return (
                <Box key={ele.isPost ? ele.postId : index} flex={1}>
                  {ele.isPost ? (
                    <HStack borderBottomWidth={2} borderColor={"primary.400"} flex={1}>
                      <Image
                        source={{
                          uri: ele["imageURL"],
                        }}
                        alt={"altText"}
                        width={ele["imageURL"] ? "49" : "49"}
                        height={ele["imageURL"] ? "49" : "49"}
                        resizeMode={"cover"}
                      />
                      <VStack flex={1} marginLeft={2}>
                        <HStack flexGrow={1} justifyContent={"space-between"}>
                          <Text>{ele.postTitle}</Text>
                          <Text marginX={2}>{dateDiffStr}</Text>
                        </HStack>
                        <Text>{ele.postContent}</Text>
                      </VStack>
                    </HStack>
                  ) : (
                    <VStack>
                      <Text>{questTitle}</Text>
                      <Text>{questContent}</Text>
                    </VStack>
                  )}
                </Box>
              );
            })
          ) : (
            <Text>No activity history..</Text>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

const UserAccountScreen = ({ navigation }) => {
  const { userInfo, newAchievementNotify } = useAppContext();
  const dispatch = useAppDispatchContext();
  const [profileTabSelected, setProfileTabSelected] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [achievementUris, setAchievementUris] = useState([]);

  useEffect(() => {
    // New Achievement prompt?
    // console.log(newAchievementNotify);
    if (newAchievementNotify) {
      // Dispatch to context and enable the modal
      dispatch({
        type: "setNewAchievementModalVisible",
        val: {
          newAchievementNotify: false,
          achievementModalVisible: true,
        },
      });
    }
  });
  useEffect(() => {
    // Reset history data
    // setHistoryData([])

    // Fetch all posts of this user
    const fetchUserPosts = async () => {
      // Fetch the Posts from Firebase
      const postListRef = createDatabaseRef(database, "UserPosts");
      onValue(postListRef, async (snapshot) => {
        // Get all the posts from Firebase
        const postList = [];
        const data = snapshot.val(); // Retrieve the data from the snapshot
        const dataList = Object.entries(data["PostData"]); // Convert the data object into an array

        await Promise.all(
          dataList.map(async (val, index) => {
            const childKey = val[0];
            const childData = val[1];
            // console.log("Key:", childKey);
            // console.log("Data:", childData);

            // Does this post belong to this user?
            if (userInfo.uid != childData.userId) {
              return;
            }

            // Destructure the data
            const { imageStoragePath, postContent, postTitle, postDate, userId, comments } = childData;
            // Is there an Image?
            let storageRef = imageStoragePath ? createStorageRef(storage, imageStoragePath) : undefined;
            try {
              const url = storageRef ? await getDownloadURL(storageRef) : undefined;
              // Add to list
              postList.push({
                postId: childKey,
                postTitle,
                postContent,
                postDate: new Date(postDate),
                imageURL: url,
                isPost: true,
              });
            } catch (error) {
              // Handle any errors
              console.log(error.message);
            }
          })
        );

        // console.log("Seeting List aginga!!!", postList);
        // Sort list based on date
        postList.sort((a, b) => b.postDate.getTime() - a.postDate.getTime());
        // Add posts to the history tab
        setHistoryData(postList);
      });
    };
    fetchUserPosts();

    // Fetch all the achievement data
    const fetchAchievementData = async () => {
      const newImages = [];
      for (let achievementName of userInfo.achievements) {
        const achRef = doc(firestore, "user_achievements", achievementName);
        const achSnap = await getDoc(achRef);
        const achData = achSnap.data();

        // Fetch Image from storage
        let storageRef = createStorageRef(storage, achData.imageStoragePath);
        try {
          const url = await getDownloadURL(storageRef);
          newImages.push(url);
        } catch (error) {
          // Handle any errors
          console.log(error.message);
        }
      }
      setAchievementUris(newImages);
    };
    fetchAchievementData();
  }, [userInfo]);

  // console.log(userInfo);
  return (
    <Box marginTop={4} flex={1} safeArea width={"100%"} alignSelf={"center"}>
      {/* Content Box */}
      <Box marginX={2} flex={1}>
        {/* Header Section */}
        <HStack justifyContent={"space-between"}>
          <Button
            leftIcon={<Icon as={MaterialIcons} name="edit" color={"black"} />}
            onPress={() => {
              console.log("Edit Profile");
            }}
            borderRadius={5}
            bg={"primary.400"}
            p={"1"}
          >
            <Text>Edit Profile</Text>
          </Button>
          <Pressable
            onPress={() => {
              console.log("Log out");
              navigation.replace("LoginPage");
            }}
          >
            <Ionicons name="log-out" size={30} color="orange" />
          </Pressable>
        </HStack>
        {/* Top Section */}
        <Box>
          <Image
            source={{
              uri: "https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-1/241039872_147750170869515_8588369519299265339_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=c6021c&_nc_ohc=c_puhPRMs40AX_4SRKd&_nc_oc=AQnA9b2enyzypM2-zH36LsOIWn4J17NxumBEkZbWL9tdzVidsu0L4vqh40wzrTzm1XA&_nc_ht=scontent-xsp1-3.xx&oh=00_AfCuKZfJ11LYbkRD3Wz1S5g5iIY45XiDOThiznHfhUyxpg&oe=649752BA",
            }}
            alt="Profile Picture"
            size={150}
            borderRadius={100}
            alignSelf={"center"}
          />
          <Button
            leftIcon={<Icon as={SimpleLineIcons} name="present" color={"black"} />}
            marginLeft={"auto"}
            marginRight={3}
            onPress={() => {
              console.log("Redeem Currency");
              navigation.navigate("RewardsScreen");
            }}
          >
            <Text>Redeem</Text>
          </Button>
          <Text underline textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
            {userInfo.name}
          </Text>
          <Text textAlign={"center"}>
            {userInfo.faction} | @{userInfo.username}
          </Text>
        </Box>

        {/* Middle Section */}
        <Box marginTop={7} borderRadius={10} shadow={1} bg="blueGray.50">
          <Text italic underline pl={"2"} pt={"2"} color={"black"}>
            Recent Achievements
          </Text>
          <HStack space={3} minHeight={20} paddingX={2} paddingY={1}>
            {achievementUris.map((ele, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: ele,
                  }}
                  alt="Achievement Badge"
                  size={"sm"}
                />
              );
            })}
          </HStack>
        </Box>

        {/* Bottom Section */}
        <Box marginTop={5} marginBottom={3} flexGrow={1}>
          <HStack space={"lg"} justifyContent={"center"}>
            <Button
              onPress={() => setProfileTabSelected(true)}
              borderRadius={5}
              bg={"primary.400"}
              p={"1"}
              width={"40%"}
              color="black"
              leftIcon={<Icon as={AntDesign} name="user" color={"black"} />}
            >
              <Text color="black">Profile</Text>
            </Button>
            <Divider orientation="vertical" bg={"black"} />
            <Button
              leftIcon={<Icon as={MaterialIcons} name="history" color={"black"} />}
              onPress={() => setProfileTabSelected(false)}
              borderRadius={5}
              bg={"primary.400"}
              p={"1"}
              width={"40%"}
            >
              <Text alignSelf={"center"}>History</Text>
            </Button>
          </HStack>
          <Box flexGrow={1} mt={3} bg="blueGray.50" shadow={1} borderRadius={10}>
            {profileTabSelected ? (
              <Text pt={2} pl={2}>
                {userInfo.about == "" ? "Nothing to see here.." : userInfo.about}
              </Text>
            ) : (
              <HistoryTab data={historyData} currDate={new Date()} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default UserAccountScreen;
