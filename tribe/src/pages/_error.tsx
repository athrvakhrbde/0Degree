import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const ErrorPage: NextPage = () => {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#000000"
      color="#ffffff"
      p={8}
    >
      <VStack spacing={6} textAlign="center" maxW="600px">
        <Heading size="xl" color="brand.500">
          Configuration Required
        </Heading>
        <Text fontSize="lg" color="rgba(255, 255, 255, 0.7)">
          Firebase environment variables are not configured.
        </Text>
        <Text fontSize="sm" color="rgba(255, 255, 255, 0.5)">
          Please add the following environment variables in Vercel project settings:
        </Text>
        <Box
          as="pre"
          bg="rgba(255, 255, 255, 0.02)"
          p={4}
          borderRadius="4px"
          fontSize="xs"
          textAlign="left"
          overflowX="auto"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
          color="rgba(255, 255, 255, 0.7)"
        >
          {`NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_CRYPTO_SECRET_PASS`}
        </Box>
        <Button
          onClick={() => router.reload()}
          variant="solid"
          bg="brand.500"
          color="#000000"
          _hover={{
            bg: "brand.400",
          }}
        >
          Retry
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorPage;
