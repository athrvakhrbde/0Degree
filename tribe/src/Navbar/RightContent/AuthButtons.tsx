import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../../atoms/authModalAtom";

const AuthButtons: React.FC = () => {
  const setAuthModelState = useSetRecoilState(authModelState);

  return (
    <>
      <Button
        variant="outline"
        height={{ base: "36px", md: "40px" }}
        display={{ base: "none", sm: "flex" }}
        minWidth={{ base: "80px", md: "100px" }}
        mr={{ base: 2, md: 3 }}
        borderRadius={0}
        fontWeight={400}
        fontSize={{ base: "13px", md: "14px" }}
        letterSpacing="0.5px"
        borderColor="rgba(255, 255, 255, 0.2)"
        color="rgba(255, 255, 255, 0.9)"
        _hover={{ borderColor: "#00ffce", color: "#00ffce" }}
        transition="all 0.3s ease"
        onClick={() => setAuthModelState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height={{ base: "36px", md: "40px" }}
        display={{ base: "none", sm: "flex" }}
        minWidth={{ base: "80px", md: "100px" }}
        mr={2}
        borderRadius={0}
        fontWeight={400}
        fontSize={{ base: "13px", md: "14px" }}
        letterSpacing="0.5px"
        bg="transparent"
        color="#00ffce"
        border="1px solid"
        borderColor="#00ffce"
        _hover={{ bg: "#00ffce", color: "#000000", transform: "translateY(-2px)" }}
        transition="all 0.3s ease"
        onClick={() => setAuthModelState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
