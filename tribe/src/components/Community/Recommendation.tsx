import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Community } from "../../atoms/CommunitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

const Recommendation: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrCommunity } = useCommunityData();
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const borderColor = "rgba(255, 255, 255, 0.2)";

  const getCommunityRecommendation = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc")
        //limit(5)
      );
      const communityDocs = await getDocs(communityQuery);

      if (isViewAll) {
        const communities = communityDocs.docs
          .slice(0, communityDocs.docs.length)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Community[];
        setCommunities(communities);
      } else {
        const communities = communityDocs.docs.slice(0, 5).map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Community[];
        setCommunities(communities);
      }
    } catch (error) {
      console.log("getCommunityRecommendation", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendation();
  }, [isViewAll]);

  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="brand.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/xw6wqhhjubh31.webp')"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    position="relative"
                    align="center"
                    fontSize={{ base: "13px", md: "14px" }}
                    borderBottom="none"
                    borderColor="transparent"
                    p={{ base: "12px 0", md: "16px 0" }}
                    fontWeight={400}
                    color="rgba(255, 255, 255, 0.9)"
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.3s ease"
                  >
                    <Flex width="80%" align="center">
                      <Flex width="auto" minWidth="24px">
                        <Text mr={{ base: 3, md: 4 }} color="rgba(255, 255, 255, 0.5)" fontWeight={300} fontSize={{ base: "14px", md: "16px" }}>
                          {index + 1}
                        </Text>
                      </Flex>
                      <Flex align="center" flex={1}>
                        {item.imageURL ? (
                          <Image
                            borderRadius="full"
                            boxSize={{ base: "28px", md: "32px" }}
                            src={item.imageURL}
                            mr={3}
                          />
                        ) : (
                          <Image src="/images/0degree-logo.svg" height={{ base: "28px", md: "32px" }} width={{ base: "28px", md: "32px" }} mr={3} alt="Community" />
                        )}
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          fontWeight={400}
                          fontSize={{ base: "14px", md: "16px" }}
                          _hover={{ color: "brand.500" }}
                          transition="color 0.3s ease"
                        >
                          {`t/${item.id}`}
                        </Text>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="0">
                      <Button
                        height={{ base: "32px", md: "36px" }}
                        fontSize={{ base: "11px", md: "12px" }}
                        variant={isJoined ? "outline" : "solid"}
                        bg={isJoined ? "transparent" : "transparent"}
                        color={isJoined ? "rgba(255, 255, 255, 0.7)" : "#00ffce"}
                        borderColor={isJoined ? "rgba(255, 255, 255, 0.2)" : "#00ffce"}
                        borderRadius={0}
                        fontWeight={400}
                        letterSpacing="0.5px"
                        px={{ base: "12px", md: "16px" }}
                        _hover={isJoined ? { borderColor: "#00ffce", color: "#00ffce" } : { bg: "#00ffce", color: "#000000" }}
                        transition="all 0.3s ease"
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p={0} mt={{ base: "16px", md: "20px" }}>
              <Button
                height={{ base: "44px", md: "48px" }}
                width="100%"
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="rgba(255, 255, 255, 0.9)"
                borderRadius={0}
                fontWeight={400}
                fontSize={{ base: "13px", md: "14px" }}
                letterSpacing="1px"
                textTransform="uppercase"
                _hover={{ borderColor: "#00ffce", color: "#00ffce" }}
                transition="all 0.3s ease"
                onClick={() =>
                  isViewAll ? setIsViewAll(false) : setIsViewAll(true)
                }
              >
                {isViewAll ? "Collapse Items" : "VIEW ALL"}
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendation;
