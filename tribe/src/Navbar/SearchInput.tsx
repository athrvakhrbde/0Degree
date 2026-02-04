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
    <Flex 
      flexGrow={1} 
      maxWidth={user ? { base: "200px", sm: "250px", md: "300px", lg: "auto" } : { base: "100%", sm: "400px", md: "500px", lg: "600px" }} 
      mr={{ base: 1, sm: 2 }} 
      align="center"
      display={{ base: user ? "none" : "flex", sm: "flex" }}
    >
      <InputGroup>
        <InputLeftElement 
          pointerEvents="none" 
          pl={{ base: 2, sm: 3 }}
          height="100%"
        >
          <SearchIcon 
            color="rgba(255, 255, 255, 0.5)" 
            fontSize={{ base: "14px", sm: "15px", md: "16px" }} 
          />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Tribe"
          fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px" }}
          fontWeight={300}
          letterSpacing="0.2px"
          bg="rgba(255, 255, 255, 0.02)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
          borderRadius={0}
          height={{ base: "40px", sm: "42px", md: "44px" }}
          minH={{ base: "44px", sm: "44px", md: "44px" }}
          padding={{ base: "10px 12px 10px 40px", sm: "12px 14px 12px 42px", md: "12px 16px 12px 44px" }}
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
