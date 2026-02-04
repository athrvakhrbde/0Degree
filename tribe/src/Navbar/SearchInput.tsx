import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const iconColor = "rgba(255, 255, 255, 0.7)";
  const focusedInputBg = "rgba(255, 255, 255, 0.03)";
  const searchBorder = "rgba(255, 255, 255, 0.2)";

  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color={iconColor} mb={1} />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search Tribe"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight={300}
          letterSpacing="0.2px"
          bg={bg}
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={0}
          height={{ base: "40px", md: "44px" }}
          padding="12px 16px 12px 40px"
          _placeholder={{ color: "rgba(255, 255, 255, 0.35)", fontWeight: 300 }}
          _hover={{
            bg: focusedInputBg,
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
          _focus={{
            outline: "none",
            borderColor: "rgba(255, 255, 255, 0.4)",
            bg: focusedInputBg,
            boxShadow: "none",
          }}
          transition="all 0.3s ease"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
