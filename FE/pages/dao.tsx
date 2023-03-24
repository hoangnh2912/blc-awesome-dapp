import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import {
  Box,
  Button,
  Stack,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { RiGovernmentFill } from "react-icons/ri";
import { MdGeneratingTokens, MdTimer } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";

import Governor from "./dao/governor";
import TokenSetting from "./dao/token";
import Timelock from "./dao/timelock";
import ReviewGovernor from "./dao/review";

import ContractDeployed from "./token-creator/contract-deployed";
import ContractUsage from "./token-creator/contract-usage";
import { BsToggleOff } from "react-icons/bs";
import { useState } from "react";
import { logger } from "@ethersproject/wordlists";

const Dao: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  const handleChange = (newIndex: any) => {
    // update the state with the new index value
    setActiveIndex(newIndex);
  };

  const items = [
    {
      title: "Governor",
      icon: RiGovernmentFill,
      content: <Governor />,
    },
    {
      title: "Token setting",
      icon: MdGeneratingTokens,
      content: <TokenSetting />,
    },
    {
      title: "Timelock setting",
      icon: MdTimer,
      content: <Timelock />,
    },
    {
      title: "Review your DAO",
      icon: IoIosRocket,
      content: <ReviewGovernor />,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    logger.info(activeIndex);
  };

  const handleBack = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <BaseLayout>
      <Stack
        direction={["column", "column", "column", "column", "column", "row"]}
      >
        <Stack flex={1}>
          <Stack
            boxShadow="lg"
            bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
            borderRadius={5}
            p={5}
          >
            <Tabs isFitted colorScheme="green" variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Create DAO</Tab>
                <Tab>Add DAO</Tab>
              </TabList>
              <TabPanels>
                {/* Create DAO */}
                <TabPanel>
                  <Text
                    as={"b"}
                    fontSize="4xl"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                  >
                    {" "}
                    Create your OWN DAO
                  </Text>
                  <Accordion
                    flex={1}
                    defaultIndex={[0]}
                    textAlign="left"
                    allowToggle
                    allowMultiple
                    onChange={handleChange}
                    index={activeIndex}
                  >
                    {items.map((item, index) => (
                      <AccordionItem
                        key={index}
                        flex={1}
                        textAlign="left"
                        // boxShadow="lg"
                        border="none"
                        paddingTop={1}
                        // rounded={"md"}
                      >
                        <AccordionButton
                          flex={1}
                          border="none"
                          outline="none"
                          textAlign="left"
                          boxShadow="lg"
                          cursor={"pointer"}
                          borderRadius="md"
                          bg="#ffffff"
                          fontWeight="bold"
                          sx={{
                            "&:focus": { outline: "none" },
                            overflow: "hidden",
                          }}
                          _expanded={{ borderBottomRadius: "none" }}
                          // _expanded={{ bg: "#FFBA8C", color: "white" }}
                          _hover={{ bg: "#FFFFFF" }}
                          _focus={{ outline: "none" }}
                        >
                          <Box flex="1" textAlign="left">
                            <HStack>
                              <Box
                                as={item.icon}
                                boxSize="26px"
                                color="gray.500"
                              />
                              <Text as={"b"} fontSize="x" color="#000080">
                                {item.title}
                              </Text>
                            </HStack>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel
                          pb={4}
                          bg="#ffffff"
                          // rounded={"md"}
                          borderBottomRadius="md"
                          padding={1}
                          // border={"1px solid #FFBA8C"}
                        >
                          {item.content}
                          <Flex mt={4} justify="flex-end">
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                colorScheme="teal"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleBack();
                                }}
                                mr={2}
                              >
                                Back
                              </Button>
                            )}
                            {index < items.length - 1 && (
                              <Button
                                variant="solid"
                                colorScheme="teal"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleNext();
                                }}
                              >
                                Continue
                              </Button>
                            )}
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {/* TESTING SITE */}
                </TabPanel>
                {/* Add DAO */}
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
          <Stack bg={"white"} boxShadow="lg" borderRadius={5} p={5} mt={5}>
            <ContractDeployed />
          </Stack>
        </Stack>
        <Stack flex={1} boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
          <ContractUsage />
        </Stack>
      </Stack>
    </BaseLayout>
  );
};
``;
export default Dao;
