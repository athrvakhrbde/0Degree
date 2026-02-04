import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type TextInputProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  // Using dark theme colors matching main site
  const searchBg = "rgba(255, 255, 255, 0.02)";
  const searchBorder = "rgba(255, 255, 255, 0.2)";

  return (
    <Stack spacing={4} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize={{ base: "15px", sm: "16px", md: "17px" }}
        fontWeight={400}
        letterSpacing="0.2px"
        borderRadius={0}
        placeholder="Title"
        bg="rgba(255, 255, 255, 0.02)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        height={{ base: "52px", sm: "56px", md: "60px" }}
        padding={{ base: "0 20px", sm: "0 24px", md: "0 28px" }}
        _placeholder={{ 
          color: "rgba(255, 255, 255, 0.4)", 
          fontWeight: 300 
        }}
        _hover={{
          bg: "rgba(255, 255, 255, 0.03)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
        _focus={{
          outline: "none",
          bg: "rgba(255, 255, 255, 0.03)",
          borderColor: "brand.500",
          boxShadow: "none",
        }}
      />
      <Textarea
        name="body"
        fontSize={{ base: "15px", sm: "16px", md: "17px" }}
        fontWeight={300}
        letterSpacing="0.2px"
        value={textInputs.body}
        onChange={onChange}
        borderRadius={0}
        minHeight="140px"
        padding={{ base: "16px 20px", sm: "18px 24px", md: "20px 28px" }}
        placeholder="Text (optional)"
        bg="rgba(255, 255, 255, 0.02)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        _placeholder={{ 
          color: "rgba(255, 255, 255, 0.4)", 
          fontWeight: 300 
        }}
        _hover={{
          bg: "rgba(255, 255, 255, 0.03)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
        _focus={{
          outline: "none",
          bg: "rgba(255, 255, 255, 0.03)",
          borderColor: "brand.500",
          boxShadow: "none",
        }}
      />
      <Flex justify="flex-end" pt={2}>
        <Button
          height={{ base: "44px", sm: "48px", md: "52px" }}
          padding={{ base: "0 32px", sm: "0 40px", md: "0 48px" }}
          fontSize={{ base: "14px", sm: "15px", md: "16px" }}
          fontWeight={400}
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInput;
