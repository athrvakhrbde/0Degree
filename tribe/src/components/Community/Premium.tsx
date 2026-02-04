import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const borderColor = "rgba(255, 255, 255, 0.2)";

  return (
    <Flex
      direction="column"
      bg="transparent"
      borderRadius={0}
      cursor="pointer"
      p={0}
      border="none"
      borderColor="transparent"
      mb={{ base: "32px", md: "48px" }}
    >
      <Flex mb={{ base: "16px", md: "20px" }} align="flex-start">
        <Icon as={GiCheckedShield} fontSize={{ base: "24px", md: "28px" }} color="brand.500" mt={1} />
        <Stack spacing={1} fontSize={{ base: "13px", md: "14px" }} pl={3} flex={1}>
          <Text fontWeight={500} fontSize={{ base: "18px", md: "20px" }} letterSpacing="-0.3px" color="#ffffff" mb={1}>
            0Degree Premium
          </Text>
          <Text fontWeight={300} lineHeight="1.6" color="rgba(255, 255, 255, 0.7)">
            The best Tribe experience, with exclusive features
          </Text>
        </Stack>
      </Flex>
      <Button 
        height={{ base: "44px", md: "48px" }} 
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
        Try Now
      </Button>
    </Flex>
  );
};
export default Premium;
