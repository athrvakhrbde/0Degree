import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModelState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInput from "./AuthInput";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModel: React.FC = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelState, setModelState] = useRecoilState(authModelState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleClose();
    //console.log(user, "🔥🔥");
  }, [user]);

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="#000000" border="1px solid" borderColor="rgba(255, 255, 255, 0.2)">
          <ModalHeader textAlign="center" color="#ffffff">
            {modelState.view === "login" && "Login"}
            {modelState.view === "signup" && "Sign Up"}
            {modelState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton color="rgba(255, 255, 255, 0.7)" _hover={{ color: "#ffffff" }} />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modelState.view === "login" || modelState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color="rgba(255, 255, 255, 0.5)" fontWeight={700} my={2}>
                    OR
                  </Text>
                  <AuthInput />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModel;
