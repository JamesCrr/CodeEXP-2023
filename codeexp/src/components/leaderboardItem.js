import { Button, Badge, Flex } from "native-base";

export const FactionBoardComponent = ({
  name,
  placing,
  currency,
  navigation,
}) => {
  return (
    <Flex direction="row" mb="2.5" mt="1.5">
      <Badge>{placing}</Badge>
      <Badge>{name}</Badge>
      <Badge>{currency}</Badge>
    </Flex>
  );
};
