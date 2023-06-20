import { Button, Badge, Flex, Box, Text } from "native-base";

export const FactionBoardComponent = ({
  name,
  placing,
  currency,
  navigation,
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
      <Box bgColor="muted.200" width="65%" justifyContent="center">
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
