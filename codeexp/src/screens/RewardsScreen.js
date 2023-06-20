import { Box, HStack, Pressable, Text } from "native-base";

const RewardsScreen = () => {
  return (
    <Box>
      <Box bg={"orange.400"}>
        <Box>
          <Text textAlign={"center"}>Individual Currency</Text>
          <Text textAlign={"center"}>3280</Text>
        </Box>

        <Box>
          <Text textAlign={"center"}>Faction Currency</Text>
          <Text textAlign={"center"}>6800</Text>
        </Box>
      </Box>

      {/* Body Box */}
      <Box marginX={2}>
        {/* See Currency History */}

        <Box margin={3}>
          <Pressable
            borderWidth={1}
            width={"45%"}
            onPress={() => {
              console.log("See Currency Hostory");
            }}
          >
            <Text>See Currency History</Text>
          </Pressable>
        </Box>

        {/* Individual Rewards */}
        <Box marginTop={5}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Claim Individual Rewards</Text>
            <Pressable
              onPress={() => {
                console.log("See All Individual");
              }}
              borderWidth={1}
            >
              <Text>See all</Text>
            </Pressable>
          </HStack>
          <HStack space={2}>
            <Text>Example Reward here...</Text>
            <Text>Example Reward here...</Text>
            <Text>Example Reward here...</Text>
          </HStack>
        </Box>

        {/* Faction Rewards */}
        <Box marginTop={5}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Claim Faction Rewards</Text>
            <Pressable
              onPress={() => {
                console.log("See All Faction");
              }}
              borderWidth={1}
            >
              <Text>See all</Text>
            </Pressable>
          </HStack>
          <HStack space={2}>
            <Text>Example Reward here...</Text>
            <Text>Example Reward here...</Text>
            <Text>Example Reward here...</Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
export default RewardsScreen;
