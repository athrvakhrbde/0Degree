import { Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
      router.push(`/0/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();

    /*
    if (community) {
      router.push(`/0/${router.query.community}/submit`);
      return;
    }
    */
  };

  return (
    <Flex
      justify="flex-start"
      align="center"
      bg="rgba(255, 255, 255, 0.02)"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      borderRadius={0}
      p={0}
      mb={{ base: "24px", sm: "32px", md: "40px" }}
      transition="all 0.3s ease"
      _hover={{
        borderColor: "rgba(255, 255, 255, 0.2)",
        bg: "rgba(255, 255, 255, 0.03)",
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <Input
        placeholder="Create Post"
        fontSize={{ base: "15px", sm: "16px", md: "17px" }}
        fontWeight={300}
        letterSpacing="0.3px"
        _placeholder={{ 
          color: "rgba(255, 255, 255, 0.4)", 
          fontWeight: 300,
          fontSize: "inherit"
        }}
        _hover={{
          bg: "transparent",
          borderColor: "transparent",
        }}
        _focus={{
          outline: "none",
          bg: "transparent",
          borderColor: "transparent",
          boxShadow: "none",
        }}
        bg="transparent"
        border="none"
        borderRadius={0}
        height={{ base: "56px", sm: "60px", md: "64px" }}
        minH={{ base: "56px", sm: "60px", md: "64px" }}
        padding={{ base: "0 24px", sm: "0 28px", md: "0 32px" }}
        width="100%"
        cursor="pointer"
        readOnly
      />
    </Flex>
  );
};
export default CreatePostLink;
