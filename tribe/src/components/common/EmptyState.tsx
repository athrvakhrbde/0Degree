import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  minHeight?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  minHeight = "400px",
}) => {
  return (
    <Flex
      minH={minHeight}
      align="center"
      justify="center"
      p={{ base: 6, md: 8 }}
    >
      <VStack spacing={4} textAlign="center" maxW="500px">
        {icon && (
          <Box fontSize={{ base: "48px", md: "64px" }} opacity={0.5}>
            {icon}
          </Box>
        )}
        <Heading
          fontSize={{ base: "20px", md: "24px" }}
          fontWeight={500}
          color="rgba(255, 255, 255, 0.9)"
          letterSpacing="-0.5px"
        >
          {title}
        </Heading>
        {description && (
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight={300}
            color="rgba(255, 255, 255, 0.6)"
            lineHeight="1.6"
          >
            {description}
          </Text>
        )}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="solid"
            bg="transparent"
            color="#00ffce"
            border="1px solid"
            borderColor="#00ffce"
            borderRadius={0}
            fontWeight={400}
            fontSize={{ base: "13px", md: "14px" }}
            letterSpacing="0.5px"
            px={{ base: "20px", md: "24px" }}
            h={{ base: "40px", md: "44px" }}
            _hover={{
              bg: "#00ffce",
              color: "#000000",
              transform: "translateY(-2px)",
            }}
            transition="all 0.3s ease"
            mt={2}
          >
            {actionLabel}
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

export default EmptyState;
