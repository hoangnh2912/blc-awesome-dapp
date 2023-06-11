import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { wrap } from "@motionone/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import NFTComponent from "../components/nft";
import BaseLayout from "../layouts/base";
import $ from "jquery";

interface ParallaxProps {
  children: any;
  select: any;
  onScroll: any;
}

const getOffset = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

function ParallaxText({ children, select, onScroll }: ParallaxProps) {
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => {
    return `${wrap(-20, 0, v)}%`;
  });

  const accelerationFactor = useRef<number>(0);
  const speedFactor = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);

  useEffect(() => {
    if (select && !isScrolling.current) {
      speedFactor.current = 1;
      accelerationFactor.current = 0.1;
      isScrolling.current = true;
      onScroll(true, null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  const refList = useRef<any>();

  useAnimationFrame(() => {
    speedFactor.current += accelerationFactor.current;
    speedFactor.current = Math.max(speedFactor.current, 0);
    if (select != 0 && speedFactor.current >= 50) {
      accelerationFactor.current = -0.1;
    }

    baseX.set(baseX.get() + speedFactor.current * 0.01);
    if (refList.current && speedFactor.current == 0 && isScrolling.current) {
      const redLineCenterItem: HTMLElement = $("#red-line-center")[0];
      const redLineCenterOffset = getOffset(redLineCenterItem);
      let centerItem: HTMLElement = $(".box-item")[0];
      for (const elem of $(".box-item")) {
        const offset = getOffset(elem);
        const centerOffset = getOffset(centerItem);
        if (
          Math.abs(offset.left - redLineCenterOffset.left) <
          Math.abs(centerOffset.left - redLineCenterOffset.left)
        ) {
          centerItem = elem;
        }
      }
      if (centerItem) {
        onScroll &&
          onScroll(false, centerItem.id, () => {
            centerItem.animate(
              [
                { transform: "scale(1)" },
                { transform: "scale(2)" },
                { transform: "scale(1)" },
                { transform: "scale(2)" },
                { transform: "scale(1)" },
              ],
              {
                easing: "ease-in-out",
                duration: 3000,
              }
            );
          });
        isScrolling.current = false;
      }
    }
  });

  return (
    <div className="parallax">
      <motion.div ref={refList} style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}
const data = [
  {
    image:
      "https://ipfs.io/ipfs/QmdorgUeVaet9TcDDf6eAYx8oh1Npsoi8vWgM4xA25WbFk",
    name: "Bored Ape Yacht Club 1",
    bet: 200,
  },
  {
    image:
      "https://ipfs.io/ipfs/QmRWSXn26HaBdLrR42g3A2fM9aBUvrYpRPE6QMZvv9C6Zo",
    name: "Bored Ape Yacht Club 2",
    bet: 150,
  },
  {
    image:
      "https://ipfs.io/ipfs/QmdnZNcduJ8sVA2D3qk9jVvJcsHMjyBMGqWyKCXB9U4WCj",
    name: "Bored Ape Yacht Club 3",
    bet: 100,
  },
  {
    image:
      "https://ipfs.io/ipfs/QmSp2bvMbUjqfx7yxBCLBFCz425iTMmKmNUMX9oZ9s2PTJ",
    name: "Bored Ape Yacht Club 4",
    bet: 300,
  },
  {
    image:
      "https://ipfs.io/ipfs/Qmcki5SrbtcvqiQs83153M77R71xed8WnZqUUyEfibXNE1",
    name: "Bored Ape Yacht Club 5",
    bet: 120,
  },
  {
    image:
      "https://ipfs.io/ipfs/QmXXdMxiVr8hTrtRxsgEEjJ4rcQUqugTuBad6xLxLhsCNi",
    name: "Bored Ape Yacht Club 6",
    bet: 80,
  },
];

let intervalSelect: any = null;
const Play: NextPage = () => {
  const scrollDataDefault = Array.from({ length: 10 }, () =>
    JSON.parse(JSON.stringify(data))
  ).flat();

  const [select, setSelect] = useState<number>(0);
  const [usdtAmount, setUSDTAmount] = useState<number>(5);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const boxData = {
    image:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/nft-la-gi-1.jpg",
    name: "NFT",
  };

  const [scrollData, setSrollData] = useState(scrollDataDefault);

  useEffect(() => {
    intervalSelect = setInterval(() => {
      setSelect(Math.floor(Math.random() * data.length + 1));
    }, 15000);
    return () => {
      if (intervalSelect) clearInterval(intervalSelect);
    };
  }, []);

  const onScrollSelect = (
    isScroll: boolean,
    id: string | null,
    callback: any
  ) => {
    setIsScroll(isScroll);
    if (id) {
      const index = parseInt(id.split("-")[2]);
      console.log("index", index);

      setSrollData((prev) => {
        if (!select) {
          return prev;
        }
        const newData = Array.from({ length: 10 }, () =>
          JSON.parse(JSON.stringify(data))
        )
          .flat()
          .map((value) => ({
            value,
            sort: Math.random() * 100 * Math.random(),
          }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        newData[index].image = data[select - 1].image;
        newData[index].name = data[select - 1].name;
        return newData;
      });
      callback && callback();
    }
  };

  return (
    <BaseLayout>
      <ParallaxText onScroll={onScrollSelect} select={select}>
        <HStack my={"4"} mr={"4"}>
          {scrollData.map((item, index) => (
            <NFTComponent
              key={index}
              className="box-item"
              id={`box-item-${index}`}
              image={isScroll ? boxData.image : item.image}
              name={isScroll ? boxData.name : item.name}
            />
          ))}
        </HStack>
      </ParallaxText>
      <Center>
        <Box
          id="red-line-center"
          position={"absolute"}
          top={"82px"}
          w={"3px"}
          h={"280px"}
          bg={"red"}
        />
        <Box w={"70%"} mt={"2rem"}>
          <HStack justifyContent={"center"}>
            <Image
              w={"1.5rem"}
              alt="USDT"
              src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
            />
            <NumberInput
              w={"120px"}
              value={usdtAmount}
              onChange={(valueString) => setUSDTAmount(parseInt(valueString))}
              min={5}
            >
              <NumberInputField
                fontWeight={"bold"}
                fontFamily={"monospace"}
                fontSize={"1.5rem"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <Center>
            <Box w={"40%"}>
              <Slider
                flex={1}
                focusThumbOnChange={false}
                value={usdtAmount}
                onChange={(valueString) => setUSDTAmount(valueString)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px">
                  {usdtAmount}
                </SliderThumb>
              </Slider>
              <HStack my={"1rem"}>
                <Button onClick={() => setUSDTAmount(10)} flex={1}>
                  10$
                </Button>
                <Button onClick={() => setUSDTAmount(20)} flex={1}>
                  20$
                </Button>
                <Button onClick={() => setUSDTAmount(50)} flex={1}>
                  50$
                </Button>
                <Button flex={1}>MAX</Button>
              </HStack>
            </Box>
          </Center>

          <SimpleGrid gap={2} columns={[1, 2, 3, 3, 4, 5]}>
            {data.map((item, index) => (
              <Stack
                key={index}
                w={"200px"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={"2rem"}
                borderWidth={"1.5px"}
                borderColor={"gray.400"}
                borderRadius={"lg"}
              >
                <NFTComponent image={item.image} name={item.name} />
                <HStack w={"100%"} px="0.5rem" justifyContent={"center"}>
                  <Text>
                    Total: <b>{item.bet}</b>
                  </Text>
                  <Image
                    w={"1rem"}
                    alt="USDT"
                    src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                  />
                </HStack>
                <Button borderTopRadius={"0"} w={"100%"} colorScheme="yellow">
                  Bet now
                </Button>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
      </Center>
    </BaseLayout>
  );
};

export default Play;
