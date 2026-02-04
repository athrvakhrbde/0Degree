import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCheck } from "react-icons/fa";
import { GiCakeSlice, GiCheckedShield } from "react-icons/gi";
import { IoRocketSharp, IoShirtOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { useSetRecoilState } from "recoil";

import { authModelState } from "../../atoms/authModalAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

interface TribeUserDocument {
  userId?: string;
  userName: string;
  userEmail?: string;
  userImage: string;
  tribeImage: string;
  timestamp: Timestamp;
}

type Props = {};

function ProfileSide({}: Props) {
  const [user] = useAuthState(auth);
  const [tribeUser, setTribeUser] = useState<TribeUserDocument>();
  const { toggleMenuOpen } = useDirectory();
  const setAuthModelState = useSetRecoilState(authModelState);
  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const borderColor = "rgba(255, 255, 255, 0.2)";

  const fetchTribeUser = async (userId: any) => {
    if (!userId) return;

    try {
      const docRef = doc(firestore, "tribeUser", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTribeUser(docSnap.data() as TribeUserDocument);
      } else return;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("FetchTribeUser Error", error);
      }
    }
  };

  const onClick = () => {
    if (!user) {
      setAuthModelState({ open: true, view: "login" });
      return;
    }

    toggleMenuOpen();
  };

  useEffect(() => {
    fetchTribeUser(user?.uid);
  }, [user]);

  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex
        align="flex-end"
        justify="center"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="140px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('https://source.unsplash.com/1600x900/?nature,photography,technolog')"
      ></Flex>
      <Flex justify="center">
        {tribeUser?.tribeImage ? (
          <Image
            src={tribeUser?.tribeImage}
            rounded="md"
            height="80px"
            mt="-50px"
            border="4px"
            borderColor="#fff"
          />
        ) : (
          <Avatar
            src={tribeUser?.tribeImage}
            name={user?.displayName || (user?.email?.split("@")[0] as string)}
            width="80px"
            height="80px"
            mt="-50px"
            rounded="md"
          />
        )}
      </Flex>

      <Flex
        position="relative"
        align="center"
        justify="center"
        fontSize="10pt"
        fontWeight={600}
      >
        <Flex align="center" justify="center" gap={2}>
          <Text fontWeight="bold" fontSize="18pt">
            {user?.displayName || user?.email?.split("@")[0]}
          </Text>
          <Icon as={GiCheckedShield} fontSize="18pt" color="brand.100" />
        </Flex>
      </Flex>
      <Text fontWeight="bold" fontSize="8pt" textAlign="center">
        t/{user?.email?.split("@")[0]}
      </Text>
      <Button
        width={80}
        mt={2}
        mb={2}
        ml="auto"
        mr="auto"
        height="30px"
        // bg="brand.100"
        bgGradient="linear(to-r, brand.100, brand.100, yellow.500)"
        _hover={{
          bgGradient: "linear(to-r, brand.100, brand.100, yellow.500)",
        }}
        display="flex"
        justifyContent="start"
        gap={20}
      >
        <Icon as={IoShirtOutline} />
        Style Your Avatar
      </Button>
      <Flex justify="center" gap={20} pt={5} pb={5}>
        <Stack>
          <Stack>
            <Text fontWeight="bold" fontSize="10pt" textAlign="start">
              Karma
            </Text>
            <Text
              fontWeight="medium"
              fontSize="9pt"
              p="auto"
              display="flex"
              gap={1}
            >
              <Icon
                as={MdVerified}
                color="blue.500"
                textAlign="center"
                mt="auto"
                mb="auto"
              />
              27,465
            </Text>
          </Stack>
          <Stack>
            <Text fontWeight="bold" fontSize="10pt" textAlign="start">
              Followers
            </Text>
            <Text
              fontWeight="medium"
              fontSize="9pt"
              p="auto"
              display="flex"
              gap={1}
            >
              <Icon
                as={FaUserCheck}
                color="blue.500"
                textAlign="center"
                mt="auto"
                mb="auto"
              />
              180
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Stack>
            <Text fontWeight="bold" fontSize="10pt" textAlign="start">
              Cake Day
            </Text>
            {tribeUser?.timestamp && (
              <Text
                fontWeight="medium"
                fontSize="9pt"
                p="auto"
                display="flex"
                gap={1}
              >
                <Icon
                  as={GiCakeSlice}
                  color="blue.500"
                  textAlign="center"
                  m="auto"
                />
                {moment(new Date(tribeUser?.timestamp?.seconds * 1000)).format(
                  "MMMM Do, YYYY"
                )}
              </Text>
            )}
          </Stack>
        </Stack>
      </Flex>
      <Flex width="350px" pr={5} pl={5} gap={5} justify="center">
        <Icon
          as={IoRocketSharp}
          color="brand.100"
          textAlign="center"
          m="auto"
        />
        <Text textAlign="center" fontSize="9pt">
          Receives the Rocket Like Award and more in the past 30 days
        </Text>
      </Flex>
      <Button
        width={80}
        mt={2}
        mb={2}
        ml="auto"
        mr="auto"
        height="30px"
        display="flex"
        justifyContent="center"
        rounded="md"
        onClick={onClick}
      >
        NEW POST
      </Button>
      <Text
        textAlign="end"
        fontSize="9pt"
        p={2}
        color="blue.500"
        fontWeight="bold"
      >
        More Options
      </Text>
    </Flex>
  );
}

export default ProfileSide;
