import { Button, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import { authModelState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModelState = useSetRecoilState(authModelState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  // Using dark theme colors matching main site
  const searchBorder = "rgba(255, 255, 255, 0.2)";
  const inputBg = "rgba(255, 255, 255, 0.02)";
  const focusedInputBg = "rgba(255, 255, 255, 0.03)";
  const placeholderColor = "rgba(255, 255, 255, 0.5)";

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

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
      {error && (
        <Text textAlign="center" color="red" fontSize="10pt" mb={2}>
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] || error?.message || "An error occurred. Please check Firebase configuration."}
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
