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
        {/* Left */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: "60px" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* Right */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          maxWidth="400px"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
