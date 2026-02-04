import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
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
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const [decryptedData, setDecryptedData] = useState({
    title: "",
    body: "",
    creatorDisplayName: "",
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
        router.push(`/0/${post.communityId}`);
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
      arr.push(post.title, post.body, post.creatorDisplayName);
      arrName.push("title", "body", "creatorDisplayName");
    } else {
      arr.push(post.title, post.creatorDisplayName);
      arrName.push("title", "creatorDisplayName");
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
      mb={{ base: "24px", sm: "28px", md: "36px", lg: "48px" }}
      transition="opacity 0.3s ease"
    >
      <Flex
        direction="column"
        align="center"
        bg="transparent"
        p={0}
        width="auto"
        minWidth={{ base: "44px", sm: "48px" }}
        mr={{ base: "12px", sm: "16px", md: "20px", lg: "24px" }}
        borderRadius={0}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.500" : "rgba(255, 255, 255, 0.4)"}
          fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
          minW={{ base: "44px", sm: "44px" }}
          minH={{ base: "44px", sm: "44px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ color: "brand.500", transform: "scale(1.1)" }}
          transition="all 0.2s ease"
        />
        <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px" }} fontWeight={500} color="rgba(255, 255, 255, 0.9)" my={{ base: 0.5, sm: 1 }}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.4)"}
          fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
          minW={{ base: "44px", sm: "44px" }}
          minH={{ base: "44px", sm: "44px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        <Stack spacing={{ base: "10px", sm: "12px", md: "14px", lg: "16px" }} p={0}>
          <Stack direction="row" spacing={{ base: "6px", sm: "8px" }} align="center" fontSize={{ base: "11px", sm: "12px", md: "13px", lg: "14px" }} flexWrap="wrap">
            {/* check */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius="full"
                    boxSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
                    mr={1}
                  />
                ) : (
                  <Image src="/images/0degree-logo.svg" height={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }} width={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }} alt="Community" mr={1} />
                )}
                <Link href={`/0/${post.communityId}`}>
                  <Text
                    fontWeight={400}
                    _hover={{ color: "brand.500" }}
                    onClick={(event) => event.stopPropagation}
                    color="rgba(255, 255, 255, 0.7)"
                    transition="color 0.3s ease"
                    fontSize="inherit"
                  >{`0/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="rgba(255, 255, 255, 0.3)" fontSize={{ base: "6px", sm: "8px" }} />
              </>
            )}
            <Text color="rgba(255, 255, 255, 0.5)" fontWeight={300} fontSize="inherit">
              Posted by u/{decryptedData.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "24px" }} fontWeight={500} lineHeight={{ base: "1.25", md: "1.3" }} letterSpacing={{ base: "-0.3px", md: "-0.5px" }} color="#ffffff">
            {decryptedData.title}
          </Text>
          {decryptedData.body && (
            <Text fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "16px" }} fontWeight={400} lineHeight={{ base: "1.5", md: "1.6" }} color="rgba(255, 255, 255, 0.7)">
              {decryptedData.body}
            </Text>
          )}
        </Stack>
        <Flex mt={{ base: "12px", sm: "16px", md: "20px", lg: "24px" }} gap={{ base: "12px", sm: "14px", md: "18px", lg: "24px" }} color="rgba(255, 255, 255, 0.5)" fontWeight={400} flexWrap="wrap">
          <Flex
            align="center"
            p={0}
            minH={{ base: "44px", sm: "44px" }}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={BsChat} mr={1} fontSize={{ base: "15px", sm: "16px", md: "17px", lg: "18px" }} />
            <Text fontSize={{ base: "12px", sm: "13px", md: "13px", lg: "14px" }} fontWeight={400}>
              {post.numberOfComments}
            </Text>
          </Flex>
          <Flex
            align="center"
            p={0}
            minH={{ base: "44px", sm: "44px" }}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={IoArrowRedoOutline} mr={1} fontSize={{ base: "15px", sm: "16px", md: "17px", lg: "18px" }} />
            <Text fontSize={{ base: "12px", sm: "13px", md: "13px", lg: "14px" }} fontWeight={400}>
              Share
            </Text>
          </Flex>
          <Flex
            align="center"
            p={0}
            minH={{ base: "44px", sm: "44px" }}
            _hover={{ color: "brand.500" }}
            cursor="pointer"
            transition="color 0.3s ease"
          >
            <Icon as={IoBookmarkOutline} mr={1} fontSize={{ base: "15px", sm: "16px", md: "17px", lg: "18px" }} />
            <Text fontSize={{ base: "12px", sm: "13px", md: "13px", lg: "14px" }} fontWeight={400}>
              Save
            </Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p={0}
              minH={{ base: "44px", sm: "44px" }}
              _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
              cursor="pointer"
              onClick={handleDelete}
              transition="color 0.3s ease"
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={1} fontSize={{ base: "15px", sm: "16px", md: "17px", lg: "18px" }} />
                  <Text fontSize={{ base: "12px", sm: "13px", md: "13px", lg: "14px" }} fontWeight={400}>
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
