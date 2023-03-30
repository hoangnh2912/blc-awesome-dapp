import {
  Box,
  Stack,
  HStack,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { AiTwotoneShop } from "react-icons/ai";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import RentMarket from "./renting/rent-market";
import ContractUsage from "./renting/contract-usage";
import SciRentMarket from "./renting/sci-rent-market";

const Renting: NextPage = () => {
  return (
    <BaseLayout selectTabIndex={4}>
      <Stack
        direction={["column", "column", "column", "column", "column", "row"]}
      >
        <Stack width={"45%"}>
          <Stack boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
            <Accordion allowToggle defaultIndex={0}>
              <AccordionItem border={"none"}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Box
                          as={AiTwotoneShop}
                          boxSize="26px"
                          color="purple.500"
                        />
                        <Text as={"b"} fontSize="x" color="gray.600">
                          {"Rent Market"}
                        </Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RentMarket />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
          <Stack flex={1} boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
            <ContractUsage />
          </Stack>
        </Stack>
        <Stack flex={1} boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
          <SciRentMarket />
        </Stack>
      </Stack>
    </BaseLayout>
  );
};

export default Renting;
