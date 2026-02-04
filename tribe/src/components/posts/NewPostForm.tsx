import {
  Alert,
  AlertIcon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Post } from "../../atoms/PostAtom";
import { firestore } from "../../firebase/clientApp";
import TextInput from "./postsForm/TextInput";

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();
  const [textInput, setTextInput] = useState({
    title: "",
    body: "",
  });
  const [encryptedData, setEncryptedData] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bg = useColorModeValue("white", "#1A202C");

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    
    // Validation
    if (!textInput.title.trim()) {
      setError(true);
      return;
    }
    
    if (!communityId) {
      setError(true);
      return;
    }
    
    // create new post
    const splitName = user.email!.split("@")[0];

    const dataName = CryptoJS.AES.encrypt(
      JSON.stringify(splitName),
      process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS as string
    ).toString();

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      communityImageURL: communityImageURL || "",
      creatorDisplayName: dataName,
      title: encryptedData.title,
      body: encryptedData.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      await addDoc(collection(firestore, "posts"), newPost);
      router.back();
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("CreatePost Error", error);
      }
      setError(true);
    }
    setLoading(false);
  };

  const encryptData = (name: string, value: string) => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS as string
      ).toString();

      setEncryptedData((prev) => ({
        ...prev,
        [name]: data,
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("EncryptData Error", error);
      }
    }
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    encryptData(name, value);
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg={bg} borderRadius={4} mt={2}>
      <Flex p={4}>
        <TextInput
          textInputs={textInput}
          onChange={onTextChange}
          handleCreatePost={handleCreatePost}
          loading={loading}
        />
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error Creating Post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
