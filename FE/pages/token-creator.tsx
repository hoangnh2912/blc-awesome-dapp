import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Erc20 from "./token-creator/erc20";
import Erc721 from "./token-creator/erc721";
import Erc1155 from "./token-creator/erc1155";

const TokenCreator: NextPage = () => {
  return (
    <BaseLayout>
      <Box bg={"white"} borderRadius={5} p={5}>
        <Tabs isFitted colorScheme="green" variant="soft-rounded">
          <TabList mb="1em">
            <Tab>ERC20</Tab>
            <Tab>ERC721</Tab>
            <Tab>ERC1155</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Erc20 />
            </TabPanel>
            <TabPanel>
              <Erc721 />
            </TabPanel>
            <TabPanel>
              <Erc1155 />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </BaseLayout>
  );
};

export default TokenCreator;
