import { useState, useEffect } from "react";
import { Pressable, Text, Button, View, VStack } from "native-base";
import { Camera, CameraType } from "expo-camera";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

let camera = undefined;
const CameraScreen = ({ route, navigation }) => {
  const { onSetImage } = route.params;
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();

  if (!cameraPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  /**
   * Takes a picture from the Camera
   */
  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();

    // Pass image back to CreatePostScreen
    onSetImage(photo.uri);
    navigation.goBack();
  };
  const toggleCameraType = () => {
    setCameraType((prevType) => {
      return prevType === CameraType.back ? CameraType.front : CameraType.back;
    });
  };

  return (
    <View flex={1}>
      {cameraPermission.granted ? (
        <Camera
          style={{ flex: 1, zIndex: 2, height: "100%" }}
          type={cameraType}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 80,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              onPress={toggleCameraType}
              bg={"warmGray.400"}
              padding={1}
              borderRadius={10}
              borderColor={"white"}
            >
              <Text fontWeight={"bold"} color={"white"} fontSize={"md"}>
                Flip Camera
              </Text>
            </Pressable>
          </View>
        </Camera>
      ) : (
        <VStack space={"md"} flexGrow={1} justifyContent={"center"} borderWidth={1}>
          <Text textAlign={"center"}>We need your permission to use the camera!</Text>
          <Button width={"80%"} alignSelf={"center"} onPress={requestCameraPermission}>
            Grant Permission
          </Button>
        </VStack>
      )}
    </View>
  );
};
export default CameraScreen;
