import { firestore, database, storage } from "../Firebase";
import { ref as createDatabaseRef, onValue } from "firebase/database";
import { ref as createStorageRef, getDownloadURL } from "firebase/storage";
import { Box, HStack, Image, Pressable, ScrollView, Text, VStack, View } from "native-base";
import { useState, useEffect } from "react";
import { useAppContext } from "../AppProvider";

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
    <Box>
      <ScrollView>
        <VStack space={2}>
          {data.length > 0 ? (
            data.map((ele, index) => {
              // console.log(ele);
              const dateDiff = getDateDiff(ele.isPost ? ele.postDate : ele.postDate, currDate);
              let dateDiffStr = "";
              if (dateDiff.d > 0) {
                dateDiffStr = `${dateDiff.d}d`;
              } else if (dateDiff.h > 0) {
                dateDiffStr = `${dateDiff.h}hr`;
              } else if (dateDiff.m > 0) {
                dateDiffStr = `${dateDiff.m}min`;
              } else if (dateDiff.s > 0) {
                dateDiffStr = `${dateDiff.s}s`;
              }

              return (
                <Box key={ele.isPost ? ele.postId : index} flex={1}>
                  {ele.isPost ? (
                    <HStack borderWidth={1} flex={1}>
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
  const { userInfo } = useAppContext();
  const [profileTabSelected, setProfileTabSelected] = useState(true);
  const [historyData, setHistoryData] = useState([]);

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
        postList.sort((a, b) => a.postDate.getTime() - b.postDate.getTime());
        // Add posts to the history tab
        setHistoryData(postList);
      });
    };
    fetchUserPosts();
  }, [userInfo]);

  // console.log(userInfo);
  return (
    <Box marginTop={4} flex={1} safeArea>
      {/* Content Box */}
      <Box marginX={2} flex={1}>
        {/* Header Section */}
        <HStack justifyContent={"space-between"}>
          <Pressable
            borderWidth={1}
            onPress={() => {
              console.log("Edit Profile");
            }}
          >
            <Text>Edit Profile</Text>
          </Pressable>
          <Pressable
            borderWidth={1}
            onPress={() => {
              console.log("Log out");
              navigation.replace("LoginPage");
            }}
          >
            <Text>Log out</Text>
          </Pressable>
        </HStack>
        {/* Top Section */}
        <Box>
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Profile Picture"
            size={150}
            borderRadius={100}
            alignSelf={"center"}
          />
          <Pressable
            marginLeft={"auto"}
            marginRight={3}
            borderWidth={1}
            onPress={() => {
              console.log("Redeem Currency");
              navigation.navigate("RewardsScreen");
            }}
          >
            <Text>Redeem Currency</Text>
          </Pressable>
          <Text textAlign={"center"}>{userInfo.name}</Text>
          <Text textAlign={"center"}>
            {userInfo.faction} | @{userInfo.username}
          </Text>
        </Box>

        {/* Middle Section */}
        <Box marginTop={7}>
          <Text>Recent Achievements</Text>
          <HStack space={2}>
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Achievement Badge"
              size={"sm"}
            />
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Achievement Badge"
              size={"sm"}
            />
          </HStack>
        </Box>

        {/* Bottom Section */}
        <Box marginTop={8} marginBottom={3} flexGrow={1}>
          <HStack space={2} justifyContent={"center"}>
            <Pressable onPress={() => setProfileTabSelected(true)} borderWidth={1}>
              <Text>Profile</Text>
            </Pressable>
            <Pressable onPress={() => setProfileTabSelected(false)} borderWidth={1}>
              <Text>History</Text>
            </Pressable>
          </HStack>
          <Box flexGrow={1} borderWidth={2} borderColor={"red.800"}>
            {profileTabSelected ? (
              <Text>{userInfo.about == "" ? "Nothing to see here.." : userInfo.about}</Text>
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
