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
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    p="10px 12px"
                    fontWeight={600}
                  >
                    <Flex width="80%" align="center">
                      <Flex width="15%">
                        <Text mr={2}>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        {item.imageURL ? (
                          <Image
                            borderRadius="full"
                            boxSize="28px"
                            src={item.imageURL}
                            mr={2}
                          />
                        ) : (
                          <Image src="/images/0degree-logo.svg" height="30px" width="30px" mr={2} alt="Community" />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{`t/${item.id}`}</span>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="10px">
                      <Button
                        height="22px"
                        fontSize="8pt"
                        variant={isJoined ? "outline" : "solid"}
                        bg={isJoined ? "transparent" : "brand.500"}
                        color={isJoined ? "rgba(255, 255, 255, 0.7)" : "#000000"}
                        borderColor={isJoined ? "rgba(255, 255, 255, 0.2)" : "brand.500"}
                        _hover={isJoined ? { borderColor: "brand.500", color: "brand.500" } : { bg: "brand.400" }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p="10px 20px">
              <Button
                height="30px"
                width="100%"
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="rgba(255, 255, 255, 0.9)"
                _hover={{ borderColor: "brand.500", color: "brand.500" }}
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
