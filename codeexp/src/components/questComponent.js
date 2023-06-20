import { Button, Heading, Divider, Box } from "native-base";

export const QuestComponent = ({ questData, navigation, screen }) => {
  console.log(questData);
  let date = questData.deadline.toDate().toDateString();
  return (
    <Box alignItems="center">
      <Box w="140">
        <Heading mx="3" alignItems="center" flexDirection="row">
          {questData.title}
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
          Deadline: {date}
        </Heading>
      </Box>
    </Box>
  );
};
