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
      bg="gray.900"
      color="white"
    >
      <VStack spacing={4} textAlign="center" p={8}>
        <Heading size="xl">Configuration Required</Heading>
        <Text fontSize="lg" color="gray.400">
          Firebase environment variables are not configured.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Please add the following environment variables in Vercel project settings:
        </Text>
        <Box
          as="pre"
          bg="gray.800"
          p={4}
          borderRadius="md"
          fontSize="xs"
          textAlign="left"
          overflowX="auto"
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
        <Button onClick={() => router.reload()} colorScheme="blue">
          Retry
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorPage;
