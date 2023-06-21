import { Button, Badge, Flex, Box, Text, Image } from "native-base";

export const FactionBoardComponent = ({
  name,
  placing,
  currency,
  navigation,
  // image,
}) => {
  return (
    <Box
      flexDirection="row"
      mt={5}
      borderRadius="lg"
      overflow="hidden"
      borderColor="gray.200"
      height={60}
      width="90%"
      alignSelf="center"
    >
      <Box
        bgColor="muted.200"
        width="15%"
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius="2xl"
        borderBottomLeftRadius="2xl"
      >
        <Text style={{ color: "black" }}>{"#" + (placing + 1)}</Text>
      </Box>
      <Box
        bgColor="muted.200"
        width="15%"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/en/7/74/Defence_Science_%26_Technology_Agency_Logo.png",
          }}
          alt={"altText"}
          size={8}
          borderRadius={100}
        />
      </Box>
      <Box bgColor="muted.200" width="50%" justifyContent="center">
        <Text style={{ color: "black" }}>{name}</Text>
      </Box>
      <Box
        bgColor="muted.200"
        width="20%"
        alignItems="center"
        justifyContent="center"
        borderTopRightRadius="2xl"
        borderBottomRightRadius="2xl"
      >
        <Text style={{ color: "#C46D36" }}>{currency}</Text>
      </Box>
    </Box>
  );
};
