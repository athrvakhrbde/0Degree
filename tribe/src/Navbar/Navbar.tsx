import { Flex, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { defaultMenuItem } from "../atoms/directoryMenuAtom";
import { auth, firestore } from "../firebase/clientApp";
import useDirectory from "../hooks/useDirectory";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { tribeProfileImage } from "./store";

interface TribeUserDocument {
  userId?: string;
  userName: string;
  userEmail?: string;
  userImage: string;
  tribeImage: string;
  timestamp: Timestamp;
}

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [tribeUserImage, setTribeUserImage] = useState("");
  const [userCreates, setUserCreate] = useState<boolean>(false);
  const { onSelectMenuItem } = useDirectory();
  // Removed colorMode and bg - using fixed dark theme

  const getUserData = async () => {
    if (user) {
      try {
        const docRef = doc(firestore, "tribeUser", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserCreate(false);
        } else {
          setUserCreate(true);
        }
      } catch (error) {
        // Silently handle error - user creation will retry on next render
        if (process.env.NODE_ENV === 'development') {
          console.error("GetUserData Error", error);
        }
      }
    } else return;
  };

  const userCreate = async (session: any) => {
    const document: TribeUserDocument = {
      userId: user?.uid,
      userName: user?.displayName || "",
      userEmail: user?.email?.toString(),
      userImage: user?.photoURL || "",
      tribeImage: tribeUserImage,
      timestamp: serverTimestamp() as Timestamp,
    };
    const userDocRef = doc(firestore, "tribeUser", session?.uid);
    await setDoc(userDocRef, document);
  };

  useEffect(() => {
    getUserData();

    setTribeUserImage(
      tribeProfileImage[Math.floor(Math.random() * tribeProfileImage.length)]
    );

    if (userCreates) {
      userCreate(user);
    } else return;
  }, [user, firestore, userCreates]);

  return (
    <Flex
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      height="64px"
      padding="16px 0"
      position="fixed"
      top={0}
      left={0}
      right={0}
      width="100%"
      zIndex={1000}
      justify={{ md: "space-between" }}
      align="center"
    >
      <Flex
        maxWidth="1400px"
        width="100%"
        margin="0 auto"
        padding="0 clamp(10px, 1vw, 15px)"
        justify={{ md: "space-between" }}
        align="center"
      >
        <Flex
          align="center"
          width={{ base: "40px", md: "auto" }}
          mr={{ base: 0, md: 2 }}
          cursor="pointer"
          onClick={() => onSelectMenuItem(defaultMenuItem)}
        >
          <Image src="/images/0degree-logo.svg" height="32px" alt="0Degree Logo" />
          <Image
            src="/images/0degree-logo.svg"
            height="32px"
            display={{ base: "none", md: "unset" }}
            alt="0Degree"
          />
        </Flex>
        <Flex align="center" gap={{ base: "16px", md: "32px" }}>
          {user && <Directory />}
          <SearchInput user={user} />
          <RightContent user={user} />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Navbar;
