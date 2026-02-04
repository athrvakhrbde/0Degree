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
    <Flex 
      justify="center" 
      p={{ 
        base: "20px 0px", 
        sm: "24px 0px", 
        md: "32px 0px", 
        lg: "40px 0px",
        xl: "48px 0px"
      }} 
      bg="transparent"
    >
      <Flex
        width="100%"
        justify="center"
        maxWidth="1400px"
        padding={{ 
          base: "0 16px", 
          sm: "0 20px", 
          md: "0 24px", 
          lg: "0 clamp(10px, 1vw, 15px)" 
        }}
        bg="transparent"
      >
        {/* Main Content */}
        <Flex
          direction="column"
          width="100%"
          maxWidth={{ 
            base: "100%", 
            sm: "100%", 
            md: "700px", 
            lg: "800px",
            xl: "900px"
          }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
