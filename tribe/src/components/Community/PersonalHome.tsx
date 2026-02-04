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
      bg="transparent"
      borderRadius={0}
      cursor="pointer"
      border="none"
      borderColor="transparent"
      position="sticky"
      top="80px"
    >
      <CreateCommunityModel open={open} handleClose={() => setOpen(false)} />
      <Flex direction="column" p={0}>
        <Text fontSize={{ base: "20px", md: "24px" }} fontWeight={500} letterSpacing="-0.5px" color="#ffffff" mb={{ base: "16px", md: "24px" }}>
          Home
        </Text>
        <Stack spacing={{ base: "16px", md: "20px" }}>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight={300} lineHeight="1.6" color="rgba(255, 255, 255, 0.7)">
            Your personal Tribe feed, built for you.
          </Text>
          <Button 
            height={{ base: "44px", md: "48px" }} 
            variant="solid" 
            bg="transparent" 
            color="#00ffce" 
            border="1px solid"
            borderColor="#00ffce"
            borderRadius={0}
            fontWeight={400}
            fontSize={{ base: "13px", md: "14px" }}
            letterSpacing="1px"
            textTransform="uppercase"
            _hover={{ bg: "#00ffce", color: "#000000", transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
          >
            Create Post
          </Button>
          <Button
            disabled={!user}
            variant="outline"
            height={{ base: "44px", md: "48px" }}
            borderColor="rgba(255, 255, 255, 0.2)"
            color="rgba(255, 255, 255, 0.9)"
            borderRadius={0}
            fontWeight={400}
            fontSize={{ base: "13px", md: "14px" }}
            letterSpacing="1px"
            textTransform="uppercase"
            _hover={{ borderColor: "#00ffce", color: "#00ffce" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
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
