import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error reporting service (e.g., Sentry, LogRocket)
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
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
              Something went wrong
            </Heading>
            <Text fontSize="lg" color="rgba(255, 255, 255, 0.7)">
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </Text>
            {process.env.NODE_ENV === 'development' && this.state.error && (
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
                {this.state.error.toString()}
              </Box>
            )}
            <Button
              onClick={this.handleReset}
              variant="outline"
              borderColor="brand.500"
              color="brand.500"
              _hover={{
                bg: "brand.500",
                color: "#000000",
              }}
            >
              Try Again
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="solid"
              bg="brand.500"
              color="#000000"
              _hover={{
                bg: "brand.400",
              }}
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
