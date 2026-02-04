import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" pl={3}>
          <SearchIcon color="rgba(255, 255, 255, 0.5)" fontSize="16px" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Tribe"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight={300}
          letterSpacing="0.2px"
          bg="rgba(255, 255, 255, 0.02)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
          borderRadius={0}
          height={{ base: "40px", md: "44px" }}
          padding="12px 16px 12px 44px"
          _placeholder={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 300 }}
          _hover={{
            bg: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
          _focus={{
            outline: "none",
            borderColor: "rgba(255, 255, 255, 0.4)",
            bg: "rgba(255, 255, 255, 0.03)",
            boxShadow: "none",
          }}
          transition="all 0.3s ease"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
