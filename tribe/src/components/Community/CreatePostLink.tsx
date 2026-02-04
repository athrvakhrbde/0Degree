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
        fontSize={{ base: "14px", sm: "15px", md: "16px" }}
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
          borderColor: "brand.500",
          boxShadow: "none",
        }}
        bg="rgba(255, 255, 255, 0.02)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        borderRadius={0}
        height={{ base: "48px", sm: "52px", md: "56px" }}
        minH={{ base: "48px", sm: "52px", md: "56px" }}
        padding={{ base: "14px 20px", sm: "15px 22px", md: "16px 24px" }}
        width="100%"
        cursor="pointer"
        onClick={onClick}
      />
    </Flex>
  );
};
export default CreatePostLink;
