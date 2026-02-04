import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

import { Community, CommunityState } from "../../../atoms/CommunitiesAtom";
import About from "../../../components/Community/About";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Header from "../../../components/Community/Header";
import NotFound from "../../../components/Community/NotFound";
import PageContent from "../../../components/Layout/PageContent";
import Posts from "../../../components/posts/Posts";
import { firestore } from "../../../firebase/clientApp";

type CommunityProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityProps> = ({ communityData }) => {
  //console.log(communityData);
  const setCommunityStateValue = useSetRecoilState(CommunityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>{communityData?.id ? `0/${communityData.id} - 0Degree Tribe` : 'Community - 0Degree Tribe'}</title>
        <meta name="description" content={communityData?.id ? `Join 0/${communityData.id} on 0Degree Tribe` : 'Community on 0Degree Tribe'} />
        <meta property="og:title" content={communityData?.id ? `0/${communityData.id} - 0Degree Tribe` : 'Community - 0Degree Tribe'} />
        <meta property="og:description" content={communityData?.id ? `Join 0/${communityData.id} on 0Degree Tribe` : 'Community on 0Degree Tribe'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </motion.div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get data and pass
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // Return empty community data - NotFound component will handle it
    if (process.env.NODE_ENV === 'development') {
      console.error("GetServerSideProps Error", error);
    }
    return {
      props: {
        communityData: "",
      },
    };
  }
}
export default CommunityPage;
