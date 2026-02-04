import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const router = useRouter();
  const uid = router.query;

  return (
    <Flex justify="center" p={{ base: "24px 0px", md: "40px 0px" }} bg="transparent">
      <Flex
        width="100%"
        justify="center"
        maxWidth="1400px"
        padding={{ base: "0 20px", md: "0 clamp(10px, 1vw, 15px)" }}
        bg="transparent"
      >
        {/* Main Content */}
        <Flex
          direction="column"
          width="100%"
          maxWidth="800px"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
