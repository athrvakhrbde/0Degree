import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { firestore } from "../../firebase/clientApp";

interface MessageBody {
  communityId: string;
  senderId: string;
  senderImageUrl?: string;
  senderName: string;
  senderEmail: any;
  messageBody: string;
  sendedAt: Timestamp;
}

interface TribeUserDocument {
  userId?: string;
  userName: string;
  userEmail?: string;
  userImage: string;
  tribeImage: string;
  timestamp: Timestamp;
}

type Props = {
  conversationId: string;
  user: User;
};

function MessageInput({ conversationId, user }: Props) {
  const [messageBody, setMessageBody] = useState("");
  const [tribeUser, setTribeUser] = useState<TribeUserDocument>();
  const [lastSeenMessages, setLastSeenMessages] = useState<any[]>([]);
  const searchBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const searchBorder = useColorModeValue("gray.200", "#4A5568");

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

  const fetchAllUser = (CommunitiesName: string) => {
    if (!CommunitiesName || !user) {
      return () => {};
    }

    try {
      const unsubscribe = onSnapshot(
        query(
          collection(
            firestore,
            `communities/${CommunitiesName}/userInCommunity`
          )
        ),
        (snapshot) => {
          const chat = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const filterUser = chat.map((doc) => doc.userId);

          let uniqueChars = filterUser.filter((c, index) => {
            return filterUser.indexOf(c) === index;
          });

          setLastSeenMessages(uniqueChars);
        },
        (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error("MessageInput snapshot error:", error);
          }
        }
      );

      return unsubscribe;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("MessageInput error:", error);
      }
      return () => {};
    }
  };

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user && !messageBody) return;
    const encryptedData = [];

    const arrData = [
      user.email!.split("@")[0],
      user.email,
      messageBody,
      tribeUser?.tribeImage,
    ];

    for (let index = 0; index < arrData.length; index++) {
      try {
        if (arrData[index]) {
          const data = CryptoJS.AES.encrypt(
            JSON.stringify(arrData[index]),
            process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS as string
          ).toString();

          encryptedData.push(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }

    try {
      const newMessageBody: MessageBody = {
        communityId: conversationId as string,
        senderId: user.uid,
        senderImageUrl: encryptedData[3]!,
        senderName: encryptedData[0],
        senderEmail: encryptedData[1],
        messageBody: encryptedData[2],
        sendedAt: serverTimestamp() as Timestamp,
      };

      await addDoc(
        collection(firestore, `communities/${conversationId}/conversation`),
        newMessageBody
      );

      setMessageBody("");

      for (let index = 0; index < lastSeenMessages.length; index++) {
        updateConversation(lastSeenMessages[index], conversationId);
      }
      setLastSeenMessages([]);
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("OnSendMessage Error", error);
      }
    }
  };

  const updateConversation = async (userId: string, communityId: string) => {
    if (!userId && !communityId) return;

    try {
      const updateDocRef = doc(
        firestore,
        `users/${userId}/communitySnippets/${communityId}`
      );

      await updateDoc(updateDocRef, {
        updateTimeStamp: serverTimestamp() as Timestamp,
      });
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("UpdateConversation Error", error);
      }
    }
  };

  useEffect(() => {
    fetchTribeUser(user?.uid);
  }, [user]);

  useEffect(() => {
    if (!conversationId || !user) {
      return;
    }

    const unsubscribe = fetchAllUser(conversationId);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [conversationId, user]);

  return (
    <Box px={4} py={6} width="100">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          size="md"
          placeholder="Message Chat Feedback"
          resize="none"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: searchBorder,
          }}
          bg={searchBg}
          disabled={!user}
        />
      </form>
    </Box>
  );
}

export default MessageInput;
