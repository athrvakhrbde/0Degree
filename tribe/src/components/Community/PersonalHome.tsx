import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import CreateCommunityModel from "../Modal/CreateCommunity/CreateCommunityModel";

const PersonalHome: React.FC = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const borderColor = "rgba(255, 255, 255, 0.2)";

  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor={borderColor}
      position="sticky"
    >
      <CreateCommunityModel open={open} handleClose={() => setOpen(false)} />
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="brand.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/sgf6r5easbh31.jpg)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Image src="/images/0degree-logo.svg" height="40px" width="40px" mr={2} alt="0Degree" />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt" color="rgba(255, 255, 255, 0.7)">
            Your personal Tribe feed, built for you.
          </Text>
          <Button height="30px" variant="solid" bg="brand.500" color="#000000" _hover={{ bg: "brand.400" }}>
            Create Post
          </Button>
          <Button
            disabled={!user}
            variant="outline"
            height="30px"
            borderColor="rgba(255, 255, 255, 0.2)"
            color="rgba(255, 255, 255, 0.9)"
            _hover={{ borderColor: "brand.500", color: "brand.500" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
