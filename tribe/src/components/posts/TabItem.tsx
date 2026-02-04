import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
//@ts-ignore
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ item, selected, setSelectTab }) => {
  // Using dark theme colors matching main site
  const hoverBg = "rgba(255, 255, 255, 0.05)";
  const borderColor = "rgba(255, 255, 255, 0.2)";

  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: hoverBg }}
      color={selected ? "brand.500" : "rgba(255, 255, 255, 0.7)"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "brand.500" : borderColor}
      onClick={() => setSelectTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text>{item.title}</Text>
    </Flex>
  );
};
export default TabItem;
