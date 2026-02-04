import { Flex, Icon, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

import CreateCommunityModel from "../../components/Modal/CreateCommunity/CreateCommunityModel";

const Icons: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);
  const hoverBg = useColorModeValue("gray.200", "#2A4365");

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Page URL copied to clipboard",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Link copied!",
            description: "Page URL copied to clipboard",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } catch (clipboardError) {
          toast({
            title: "Failed to share",
            description: "Please copy the URL manually",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <CreateCommunityModel 
        open={createCommunityOpen} 
        handleClose={() => setCreateCommunityOpen(false)} 
      />
      <Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          borderRadius="1px solid"
          borderColor="gray.200"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
            onClick={handleShare}
            title="Share page"
          >
            <Icon as={BsArrowUpRightCircle} fontSize={20} />
          </Flex>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
            onClick={() => {
              toast({
                title: "Filter",
                description: "Filter options coming soon",
                status: "info",
                duration: 2000,
                isClosable: true,
              });
            }}
            title="Filter posts"
          >
            <Icon as={IoFilterCircleOutline} fontSize={22} />
          </Flex>
        </Flex>
        <>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
            onClick={handleNotifications}
            title="Notifications"
            position="relative"
          >
            <Icon as={IoNotificationsOutline} fontSize={20} />
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
            onClick={() => setCreateCommunityOpen(true)}
            title="Create community"
          >
            <Icon as={GrAdd} fontSize={20} />
          </Flex>
        </>
      </Flex>
    </>
  );
};
export default Icons;
