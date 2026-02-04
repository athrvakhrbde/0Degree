import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import About from "../../../components/Community/About";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/posts/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);

  const { communityStateValue } = useCommunityData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Create Post - 0Degree Tribe</title>
        <meta name="description" content="Create a new post in 0Degree Tribe" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PageContent>
        <>
          <Box p="14px 0px" borderRadius="1px solid" borderColor="white">
            <Text>Create a Post</Text>
          </Box>
          {user && (
            <NewPostForm
              user={user}
              communityImageURL={communityStateValue.currentCommunity?.imageURL}
            />
          )}
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity} />
          )}
        </>
      </PageContent>
    </motion.div>
  );
};
export default SubmitPostPage;
