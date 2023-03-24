import type { NextPage } from "next";
import BaseLayout from "../../layouts/base";
import {
  Box,
  localStorageManager,
  Grid,
  GridItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Heading,
} from "@chakra-ui/react";
import Erc20Votes from "./erc20votes";
import Erc721Votes from "./erc721votes";
import { useEffect, useMemo, useState } from "react";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
import { COLOR_INFO } from "../../constants/constants";

const TokenSetting: NextPage = () => {
  // const [tokenType, setTokenType] = useState("ERC20Votes");
  const [tokenType, setTokenType] = [
    useStoreState((state) => state.dao.tokenType),
    useStoreActions((state) => state.dao.setTokenType),
  ];

  const handleTabChange = (index: number) => {
    setTokenType(index === 0 ? "ERC20Votes" : "ERC721Votes");
  };

  console.log("tokenType", tokenType);

  return (
    <Stack
      direction={["column", "column", "column", "column", "column", "row"]}
      //   borderRadius={5}
      //   p={5}
    >
      {/* <Stack boxShadow="lg" bg={"white"} borderRadius={5} p={5}> */}
      <Tabs
        isFitted
        colorScheme="green"
        variant="soft-rounded"
        onChange={handleTabChange}
      >
        <TabList mb="1em">
          <Tab value={"ERC20Votes"}>ERC20Votes</Tab>
          <Tab value={"ERC721Votes"}>ERC721Votes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Erc20Votes />
          </TabPanel>
          <TabPanel>
            <Erc721Votes />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </Stack> */}
    </Stack>
  );
};

export default TokenSetting;
