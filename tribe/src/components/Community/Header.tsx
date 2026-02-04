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
    <Flex direction="column" width="100%" height={{ base: "140px", sm: "150px", md: "160px" }}>
      <Box height="50%" bg="brand.500" />
      <Flex justifyContent="center" bg={bg} height="50%">
        <Flex width="95%" maxWidth="860px" align="center">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize={{ base: "60px", sm: "66px", md: "72px" }}
              src={communityStateValue.currentCommunity.imageURL}
              alt="profile Image"
              position="relative"
              top={{ base: "-30px", sm: "-33px", md: "-36px" }}
              border="4px solid"
              borderColor="#000000"
              bg="#000000"
            />
          ) : (
            <Image
              src="/images/0degree-logo.svg"
              boxSize={{ base: "60px", sm: "66px", md: "72px" }}
              position="relative"
              top={{ base: "-30px", sm: "-33px", md: "-36px" }}
              border="4px solid"
              borderColor="#000000"
              borderRadius="50%"
              bg="#000000"
              alt="Community"
            />
          )}
          <Flex 
            padding={{ base: "8px 12px", sm: "10px 16px", md: "12px 20px" }}
            ml={{ base: "12px", sm: "16px", md: "20px" }}
            align="center"
            flex={1}
            justify="space-between"
          >
            <Flex direction="column" gap={{ base: "2px", sm: "4px" }}>
              <Text 
                fontWeight={800} 
                fontSize={{ base: "20px", sm: "24px", md: "28px" }}
                color="#ffffff"
                letterSpacing="-0.5px"
              >
                {communityData.id}
              </Text>
              <Text 
                fontWeight={400} 
                fontSize={{ base: "11px", sm: "12px", md: "13px" }} 
                color="rgba(255, 255, 255, 0.7)"
                letterSpacing="0.2px"
              >
                0/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height={{ base: "36px", sm: "40px", md: "44px" }}
              px={{ base: "20px", sm: "24px", md: "28px" }}
              fontSize={{ base: "13px", sm: "14px", md: "15px" }}
              fontWeight={400}
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
