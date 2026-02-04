import { Button, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import { authModelState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { getFirebaseErrorMessage } from "../../../firebase/errors";
import { validateEmail } from "../../../utils/validation";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModelState = useSetRecoilState(authModelState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  // Using dark theme colors matching main site
  const searchBorder = "rgba(255, 255, 255, 0.2)";
  const inputBg = "rgba(255, 255, 255, 0.02)";
  const focusedInputBg = "rgba(255, 255, 255, 0.03)";
  const placeholderColor = "rgba(255, 255, 255, 0.5)";

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    
    // Validation
    if (!loginForm.email.trim()) {
      setFormError("Email is required");
      return;
    }
    if (!validateEmail(loginForm.email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    if (!loginForm.password) {
      setFormError("Password is required");
      return;
    }
    if (loginForm.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  
  // Update form error when Firebase error changes
  React.useEffect(() => {
    if (error) {
      setFormError(getFirebaseErrorMessage(error));
    }
  }, [error]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email..."
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: placeholderColor }}
        _hover={{
          bg: focusedInputBg,
          border: "1px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: focusedInputBg,
          border: "1px solid",
          borderColor: "brand.500",
        }}
        bg={inputBg}
      />
      <Input
        required
        name="password"
        placeholder="Password..."
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: placeholderColor }}
        _hover={{
          bg: focusedInputBg,
          border: "1px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: focusedInputBg,
          border: "1px solid",
          borderColor: "brand.500",
        }}
        bg={inputBg}
      />
      {(formError || error) && (
        <Text 
          textAlign="center" 
          color="rgba(255, 100, 100, 0.9)" 
          fontSize={{ base: "12px", md: "13px" }} 
          mb={2}
          px={2}
        >
          {formError || getFirebaseErrorMessage(error)}
        </Text>
      )}
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
        bg="brand.500"
        color="#000000"
        _hover={{ bg: "brand.400" }}
      >
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="brand.500"
          cursor="pointer"
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New Here?</Text>
        <Text
          color="brand.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
