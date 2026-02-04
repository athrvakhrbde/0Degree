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
          fontSize="10pt"
          bg={bg}
          _placeholder={{ colors: "gray.500" }}
          _hover={{
            bg: focusedInputBg,
            border: "1px solid",
            borderColor: searchBorder,
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: searchBorder,
            bg: focusedInputBg,
          }}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
