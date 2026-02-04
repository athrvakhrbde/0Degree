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
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="brand.500" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600} color="#ffffff">0Degree Premium</Text>
          <Text color="rgba(255, 255, 255, 0.7)">The best Tribe experience, with exclusive features</Text>
        </Stack>
      </Flex>
      <Button height="30px" bg="brand.500" color="#000000" _hover={{ bg: "brand.400" }}>
        Try Now
      </Button>
    </Flex>
  );
};
export default Premium;
