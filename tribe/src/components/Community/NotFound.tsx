import React from "react";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import EmptyState from "../common/EmptyState";

const NotFound: React.FC = () => {
  return (
    <>
      <Head>
        <title>Community Not Found - 0Degree Tribe</title>
        <meta name="description" content="The community you're looking for doesn't exist or has been removed" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <EmptyState
        title="Community Not Found"
        description="Sorry, that community does not exist or has been removed."
        minHeight="60vh"
        actionLabel="Go Home"
        onAction={() => window.location.href = "/"}
      />
    </>
  );
};
export default NotFound;
