import { Divider, Box, Heading } from "native-base";

const CreateQuest = () => {
  const fucntionfuckoff = () => {};
  return (
    <Box alignItems="center">
      <Box w="140">
        <Heading mx="3" alignItems="center" flexDirection="row" color="black">
          Chrome
        </Heading>
        <Divider
          my="2"
          _light={{
            bg: "muted.800",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <Heading mx="3" alignItems="center" flexDirection="row">
          Firefox
        </Heading>
      </Box>
    </Box>
  );
};

export default CreateQuest;
