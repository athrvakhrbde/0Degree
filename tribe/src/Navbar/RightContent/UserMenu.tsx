import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import { useRouter } from "next/router";
import { IoSparkles } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModelState);

  const handelNavigatePage = () => {
    if (user) {
      router.push({
        pathname: `/profile/${user?.uid}`,
        query: {
          uid: user?.uid.toString(),
        },
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 8px"
        borderRadius={0}
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.3s ease"
      >
        <Flex align="center">
          {user ? (
            <>
              <Flex
                display={{ base: "none", lg: "flex" }}
                flexDirection="column"
                fontSize={{ base: "10px", md: "12px" }}
                alignItems="flex-start"
                mr={3}
              >
                <Text fontWeight={500} color="rgba(255, 255, 255, 0.9)">
                  {user?.displayName || user?.email?.split("@")[0]}
                </Text>
                <Flex alignItems="center">
                  <Icon as={IoSparkles} color="brand.500" fontSize="12px" mr={1} />
                  <Text fontSize="10px" color="rgba(255, 255, 255, 0.5)">1 karma</Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Icon fontSize={24} color="rgba(255, 255, 255, 0.5)" as={VscAccount} />
          )}
          <ChevronDownIcon color="rgba(255, 255, 255, 0.5)" />
        </Flex>
      </MenuButton>
      <MenuList mt={2} bg="rgba(0, 0, 0, 0.95)" backdropFilter="blur(10px)" border="1px solid" borderColor="rgba(255, 255, 255, 0.2)" borderRadius={0}>
        {user ? (
          <>
            <MenuDivider />
            <MenuItem
              fontSize="13px"
              fontWeight={400}
              _hover={{ bg: "rgba(255, 255, 255, 0.05)", color: "brand.500" }}
            >
              <Flex align="center" onClick={handelNavigatePage}>
                <Icon fontSize={18} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="13px"
              fontWeight={400}
              _hover={{ bg: "rgba(255, 255, 255, 0.05)", color: "brand.500" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon fontSize={18} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="13px"
              fontWeight={400}
              _hover={{ bg: "rgba(255, 255, 255, 0.05)", color: "brand.500" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
