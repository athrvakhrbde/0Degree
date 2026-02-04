import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

import { authModelState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { toggleMenuOpen } = useDirectory();
  const setAuthModelState = useSetRecoilState(authModelState);

  const onClick = () => {
    if (!user) {
      setAuthModelState({ open: true, view: "login" });
      return;
    }

    const { communityId } = router.query;

    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();

    /*
    if (community) {
      router.push(`/r/${router.query.community}/submit`);
      return;
    }
    */
  };

  return (
    <Flex
      justify="flex-start"
      align="center"
      bg="transparent"
      height="auto"
      borderRadius={0}
      border="none"
      p={0}
      mb={{ base: "20px", sm: "24px", md: "32px", lg: "40px" }}
      gap={{ base: "12px", sm: "14px", md: "16px" }}
    >
      <Input
        placeholder="Create Post"
        fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px" }}
        fontWeight={300}
        letterSpacing="0.2px"
        _placeholder={{ color: "rgba(255, 255, 255, 0.35)", fontWeight: 300 }}
        _hover={{
          bg: "rgba(255, 255, 255, 0.02)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        _focus={{
          outline: "none",
          bg: "rgba(255, 255, 255, 0.02)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "none",
        }}
        bg="rgba(255, 255, 255, 0.02)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        borderRadius={0}
        height={{ base: "44px", sm: "48px", md: "52px", lg: "56px" }}
        minH={{ base: "44px", sm: "44px", md: "48px", lg: "56px" }}
        padding={{ base: "12px 16px", sm: "13px 17px", md: "14px 18px" }}
        flex={1}
        onClick={onClick}
      />
      <Flex gap={{ base: "10px", sm: "12px", md: "14px" }} align="center">
        <Icon
          as={IoImageOutline}
          fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
          color="rgba(255, 255, 255, 0.5)"
          cursor="pointer"
          minW={{ base: "44px", sm: "44px" }}
          minH={{ base: "44px", sm: "44px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ color: "brand.500" }}
          transition="color 0.3s ease"
        />
        <Icon 
          as={BsLink45Deg} 
          fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }} 
          color="rgba(255, 255, 255, 0.5)" 
          cursor="pointer"
          minW={{ base: "44px", sm: "44px" }}
          minH={{ base: "44px", sm: "44px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ color: "brand.500" }}
          transition="color 0.3s ease"
        />
      </Flex>
    </Flex>
  );
};
export default CreatePostLink;
