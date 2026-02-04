import React from "react";
import {
  Stack,
  Box,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";

const PostLoader: React.FC = () => {
  return (
    <Stack spacing={{ base: 4, md: 6 }}>
      {[1, 2, 3, 4].map((item) => (
        <Box
          key={item}
          p={0}
          bg="transparent"
          borderRadius={0}
        >
          <Flex direction="row" mb={4}>
            <Skeleton
              width={{ base: "44px", md: "48px" }}
              height={{ base: "44px", md: "48px" }}
              borderRadius="full"
              mr={{ base: 3, md: 4 }}
            />
            <Box flex={1}>
              <SkeletonText
                noOfLines={1}
                width="30%"
                spacing="2"
                mb={2}
              />
              <SkeletonText
                noOfLines={1}
                width="60%"
                spacing="2"
              />
            </Box>
          </Flex>
          <SkeletonText
            noOfLines={2}
            spacing="3"
            mb={3}
          />
          <Skeleton
            height={{ base: "200px", md: "300px" }}
            borderRadius={0}
            mb={3}
          />
          <Flex gap={4}>
            <Skeleton height="20px" width="60px" />
            <Skeleton height="20px" width="60px" />
            <Skeleton height="20px" width="60px" />
          </Flex>
        </Box>
      ))}
    </Stack>
  );
};
export default PostLoader;
