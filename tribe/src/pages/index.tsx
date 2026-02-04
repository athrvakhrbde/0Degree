import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Post, PostVote } from "../atoms/PostAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import EmptyState from "../components/common/EmptyState";
import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/posts/PostItem";
import PostLoader from "../components/posts/PostLoader";
import { auth, firestore } from "../firebase/clientApp";
import useCommunityData from "../hooks/useCommunityData";
import usePosts from "../hooks/usePosts";
import { logger } from "../utils/logger";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  //const communityStateValue = useRecoilValue(CommunityState);

  const buildUserHomeFeed = async () => {
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );

        const postDoc = await getDocs(postQuery);
        const posts = postDoc.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      }
    } catch (error) {
      logger.error("Building Home Error", error);
      // User will see empty feed - error handled gracefully
    }
  };
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc")
        //limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      logger.error("BuildNoUserHome Error", error);
      // User will see empty feed - error handled gracefully
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);

      const batches: PostVote[] | any[][] = [];

      while (postIds.length) {
        const batch = postIds.splice(0, 10);

        const postVotesQuery = query(
          collection(firestore, `users/${user?.uid}/postVotes`),
          where("postId", "in", [...batch])
        );
        const postVoteDoc = await getDocs(postVotesQuery);

        const postVotes = postVoteDoc.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        batches.push(postVotes as any);
      }

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: batches.flat() as PostVote[],
      }));
    } catch (error) {
      logger.error("getUserPostVotes Error", error);
      // Votes may not be accurate - error handled gracefully
    }
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildNoUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Tribe - 0Degree Community</title>
        <meta name="description" content="Join the 0Degree Tribe - A community platform for dropouts helping each other thrive" />
        <meta property="og:title" content="Tribe - 0Degree Community" />
        <meta property="og:description" content="Join the 0Degree Tribe - A community platform for dropouts helping each other thrive" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent>
        <>
          <CreatePostLink />
          {loading || loadingUser ? (
            <PostLoader />
          ) : postStateValue.posts.length === 0 ? (
            <EmptyState
              title="No Posts Yet"
              description={user ? "Be the first to create a post!" : "Join the community to see posts and create your own."}
              actionLabel={user ? "Create Post" : "Sign Up"}
              onAction={() => {
                if (!user) {
                  // Trigger auth modal
                  window.location.href = "/";
                } else {
                  // Trigger create post
                  const createPostLink = document.querySelector('[placeholder="Create Post"]');
                  if (createPostLink) {
                    (createPostLink as HTMLElement).click();
                  }
                }
              }}
            />
          ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === post.id
                    )?.voteValue
                  }
                  userIsCreator={user?.uid === post.creatorId}
                  onSelectPost={onSelectPost}
                  homePage
                />
              ))}
            </Stack>
          )}
        </>
      </PageContent>
    </motion.div>
  );
};

export default Home;
