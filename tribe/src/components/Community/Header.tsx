import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Community } from "../../atoms/CommunitiesAtom";
import { FaUsers } from "react-icons/fa";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const { communityStateValue, onJoinOrCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="brand.500" />
      <Flex justifyContent="center" bg={bg} height="50%">
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="profile Image"
              position="relative"
              top={-3}
              color="brand.500"
              border="4px solid white"
            />
          ) : (
            <Image
              src="/images/0degree-logo.svg"
              boxSize="66px"
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius="50%"
              alt="Community"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16px">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10px" color="rgba(255, 255, 255, 0.7)">
                t/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              isLoading={loading}
              onClick={() => {
                onJoinOrCommunity(communityData, isJoined);
              }}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
