import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";

import MainContainer from "../../components/profilePage/MainContainer";

type Props = {};

function ProfilePage({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Profile - 0Degree Tribe</title>
        <meta name="description" content="View user profile on 0Degree Tribe" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <MainContainer />
    </motion.div>
  );
}

export default ProfilePage;
