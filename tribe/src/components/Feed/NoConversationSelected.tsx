import { Flex, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Image } from "@chakra-ui/react";

type Props = {
  user?: User;
};

function NoConversationSelected({ user }: Props) {
  return (
    <Flex height="100%" justify="center" align="center">
      <Stack spacing={10} align="center">
        <Text fontSize={40}>
          {user ? "Select a Conversation" : "You Need To Login"}
        </Text>
        <Image src="/images/0degree-logo.svg" height="90px" width="90px" alt="0Degree" />
      </Stack>
    </Flex>
  );
}

export default NoConversationSelected;
