import { Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  // Using dark theme colors matching main site
  const hoverBg = "rgba(255, 255, 255, 0.05)";
  const createUserDocument = async (user: User) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split("@")[0] || "",
        photoURL: user.photoURL || "",
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
      }, { merge: true }); // Use merge to avoid overwriting existing data
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("CreateUserDocument Error", error);
      }
      // Don't throw - user is already created, document creation failure is non-critical
    }
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        _hover={{ bg: hoverBg }}
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth" _hover={{ bg: hoverBg }}>
        Some Other Provider
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
