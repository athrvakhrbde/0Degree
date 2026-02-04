import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

import { Community, CommunityState } from "../../atoms/CommunitiesAtom";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFieldRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(CommunityState);
  const bg = useColorModeValue("white", "#1A202C");

  const onUploadingImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);

    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downLodeUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downLodeUrl,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageUrl: downLodeUrl,
        } as Community,
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("OnUploadImage Error", error);
      }
    }
    setUploadingImage(false);
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="brand.500"
        color="#000000"
        p={3}
        borderRadius={0}
      >
        <Text fontSize={{ base: "12px", sm: "13px", md: "14px" }} fontWeight={700} letterSpacing="0.3px">
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" fontSize={{ base: "16px", sm: "18px" }} />
      </Flex>
      <Flex direction="column" p={3} bg={bg} borderRadius={0}>
        <Stack>
          <Flex width="100%" p={2} fontSize={{ base: "11px", sm: "12px", md: "13px" }} fontWeight={700} gap={4}>
            <Flex direction="column" flexGrow={1}>
              <Text fontSize={{ base: "16px", sm: "18px", md: "20px" }} fontWeight={800} color="#ffffff">
                {communityData.numberOfMembers.toLocaleString()}
              </Text>
              <Text fontSize={{ base: "11px", sm: "12px", md: "13px" }} fontWeight={400} color="rgba(255, 255, 255, 0.7)">
                Members
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text fontSize={{ base: "16px", sm: "18px", md: "20px" }} fontWeight={800} color="#ffffff">
                1
              </Text>
              <Text fontSize={{ base: "11px", sm: "12px", md: "13px" }} fontWeight={400} color="rgba(255, 255, 255, 0.7)">
                Online
              </Text>
            </Flex>
          </Flex>
          <Divider />

          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={400}
            fontSize={{ base: "11px", sm: "12px", md: "13px" }}
            color="rgba(255, 255, 255, 0.7)"
          >
            <Icon as={RiCakeLine} fontSize={{ base: "16px", sm: "18px" }} mr={2} />
            {communityData.createdAt && (
              <>
                <Text>
                  Created{" "}
                  {moment(
                    new Date(communityData.createdAt?.seconds * 1000)
                  ).format("MMM DD, YYYY")}
                </Text>
              </>
            )}
          </Flex>
          <Link href={`/0/${communityData.id}/submit`}>
            <Button mt={3} height="30px">
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize={{ base: "11px", sm: "12px", md: "13px" }}>
                <Text fontWeight={600} color="#ffffff">Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="brand.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline", color: "brand.400" }}
                    onClick={() => selectedFieldRef.current?.click()}
                    transition="color 0.3s ease"
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      borderRadius="full"
                      boxSize="40px"
                      alt="community Image"
                    />
                  ) : (
                    <Image src="/images/0degree-logo.svg" height="40px" width="40px" mr={2} alt="Community" />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text cursor="pointer" onClick={onUploadingImage}>
                      Save Changes
                    </Text>
                  ))}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFieldRef}
                  onChange={onSelectedFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
