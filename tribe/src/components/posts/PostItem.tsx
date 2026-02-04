import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

import { Post } from "../../atoms/PostAtom";

// const secretPass = process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS;

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<Element, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const [decryptedData, setDecryptedData] = useState({
    title: "",
    body: "",
    creatorDisplayName: "",
    imageURL: "",
  });
  const singlePostPage = !onSelectPost;
  const router = useRouter();

  // Using dark theme colors matching main site
  const bg = "rgba(255, 255, 255, 0.02)";
  const borderColor = "rgba(255, 255, 255, 0.2)";
  const singlePageBorderColor = "rgba(255, 255, 255, 0.2)";
  const voteLineBorderColor = "rgba(255, 255, 255, 0.1)";
  const IconHoverBg = "rgba(255, 255, 255, 0.05)";
  const IconBg = "rgba(255, 255, 255, 0.1)";
  const voteIconBg = "rgba(255, 255, 255, 0.4)";

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to Delete Post");
      }

      // Post deleted successfully

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    const arr = [];
    const arrName: string[] = [];

    if (post.body) {
      arr.push(post.title, post.body, post.creatorDisplayName, post.imageURL);
      arrName.push("title", "body", "creatorDisplayName", "imageURL");
    } else {
      arr.push(post.title, post.creatorDisplayName, post.imageURL);
      arrName.push("title", "creatorDisplayName", "imageURL");
    }

    try {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index]) {
          const bytes = CryptoJS.AES.decrypt(
            arr[index]!,
            process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS as string
          );
          const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          setDecryptedData((prev) => ({
            ...prev,
            [arrName[index]]: data,
          }));
        } else return;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("PostItem useEffect Error", error);
      }
    }
  }, [post]);

  return (
    <Flex
      border="none"
      bg="transparent"
      borderColor="transparent"
      borderRadius={0}
      _hover={{ opacity: singlePostPage ? 1 : 0.9 }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
      mb={{ base: "32px", md: "48px" }}
      transition="opacity 0.3s ease"
    >
      <Flex
        direction="column"
        align="center"
        bg="transparent"
        p={0}
        width="auto"
        minWidth="48px"
        mr={{ base: "16px", md: "24px" }}
        borderRadius={0}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.500" : "rgba(255, 255, 255, 0.4)"}
          fontSize={{ base: "20px", md: "24px" }}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
          _hover={{ color: "brand.500", transform: "scale(1.1)" }}
          transition="all 0.2s ease"
        />
        <Text fontSize={{ base: "14px", md: "16px" }} fontWeight={500} color="rgba(255, 255, 255, 0.9)" my={1}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.4)"}
          fontSize={{ base: "20px", md: "24px" }}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
          _hover={{ color: "rgba(255, 255, 255, 0.6)", transform: "scale(1.1)" }}
          transition="all 0.2s ease"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={{ base: "12px", md: "16px" }} p={0}>
          <Stack direction="row" spacing="8px" align="center" fontSize={{ base: "12px", md: "14px" }}>
            {/* check */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius="full"
                    boxSize={{ base: "20px", md: "24px" }}
                    mr={1}
                  />
                ) : (
                  <Image src="/images/0degree-logo.svg" height={{ base: "20px", md: "24px" }} width={{ base: "20px", md: "24px" }} alt="Community" mr={1} />
                )}
                <Link href={`/r/${post.communityId}`}>
                  <Text
                    fontWeight={400}
                    _hover={{ color: "brand.500" }}
                    onClick={(event) => event.stopPropagation}
                    color="rgba(255, 255, 255, 0.7)"
                    transition="color 0.3s ease"
                  >{`t/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="rgba(255, 255, 255, 0.3)" fontSize="8px" />
              </>
            )}
            <Text color="rgba(255, 255, 255, 0.5)" fontWeight={300}>
              Posted by u/{decryptedData.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={{ base: "18px", md: "24px" }} fontWeight={500} lineHeight="1.3" letterSpacing="-0.5px" color="#ffffff">
            {decryptedData.title}
          </Text>
          {decryptedData.body && (
            <Text fontSize={{ base: "14px", md: "16px" }} fontWeight={400} lineHeight="1.6" color="rgba(255, 255, 255, 0.7)">
              {decryptedData.body}
            </Text>
          )}
          {post.imageURL && (
            <Flex justify="center" align="center" p={0} mt={{ base: "16px", md: "24px" }}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={0} />
              )}
              <Image
                src={decryptedData.imageURL}
                maxHeight="600px"
                width="100%"
                alt="Post Image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                borderRadius={0}
              />
            </Flex>
          )}
        </Stack>
        <Flex mt={{ base: "16px", md: "24px" }} gap={{ base: "16px", md: "24px" }} color="rgba(255, 255, 255, 0.5)" fontWeight={400}>
          <Flex
            align="center"
            p={0}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={BsChat} mr={1} fontSize={{ base: "16px", md: "18px" }} />
            <Text fontSize={{ base: "13px", md: "14px" }} fontWeight={400}>
              {post.numberOfComments}
            </Text>
          </Flex>
          <Flex
            align="center"
            p={0}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={IoArrowRedoOutline} mr={1} fontSize={{ base: "16px", md: "18px" }} />
            <Text fontSize={{ base: "13px", md: "14px" }} fontWeight={400}>
              Share
            </Text>
          </Flex>
          <Flex
            align="center"
            p={0}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={IoBookmarkOutline} mr={1} fontSize={{ base: "16px", md: "18px" }} />
            <Text fontSize={{ base: "13px", md: "14px" }} fontWeight={400}>
              Save
            </Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p={0}
              _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
              cursor="pointer"
              onClick={handleDelete}
              transition="color 0.3s ease"
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={1} fontSize={{ base: "16px", md: "18px" }} />
                  <Text fontSize={{ base: "13px", md: "14px" }} fontWeight={400}>
                    Delete
                  </Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
