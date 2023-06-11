import {
  Box,
  Button,
  Center,
  Container,
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

interface ParallaxProps {
  children: any;
  select: any;
  onScroll: any;
}

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

    if (speedFactor.current >= 50) {
      accelerationFactor.current = 0;
    }
    if (select != 0 && accelerationFactor.current == 0) {
      accelerationFactor.current = -0.1;
    }
    baseX.set(baseX.get() + speedFactor.current * 0.01);
    if (refList.current && speedFactor.current == 0 && isScrolling.current) {
      const element = document.elementFromPoint(window.innerWidth / 2 + 3, 225);
      if (element) {
        onScroll &&
          onScroll(false, element.id, () => {
            element.animate(
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

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */

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
    image: "https://chainwitcher.com/wp-content/uploads/2022/06/BORED-APE.jpg",
    name: "Bored Ape Yacht Club 1",
    bet: 200,
  },
  {
    image:
      "https://cdn.gfinityesports.com/images/ncavvykf/gfinityesports/72b75071425344d5dca2762dbeeb752b00132afe-1200x675.png",
    name: "Bored Ape Yacht Club 2",
    bet: 150,
  },
  {
    image:
      "https://s32659.pcdn.co/wp-content/uploads/2022/03/bayc11-850x477.png",
    name: "Bored Ape Yacht Club 3",
    bet: 100,
  },
  {
    image:
      "https://s32659.pcdn.co/wp-content/uploads/2022/03/bayc11-850x477.png",
    name: "Bored Ape Yacht Club 4",
    bet: 300,
  },
  {
    image:
      "https://s32659.pcdn.co/wp-content/uploads/2022/03/bayc11-850x477.png",
    name: "Bored Ape Yacht Club 5",
    bet: 120,
  },
  {
    image:
      "https://s32659.pcdn.co/wp-content/uploads/2022/03/bayc11-850x477.png",
    name: "Bored Ape Yacht Club 6",
    bet: 80,
  },
];

let intervalSelect: any = null;
const NFTProvider: NextPage = () => {
  const [select, setSelect] = useState<number>(0);
  const [usdtAmount, setUSDTAmount] = useState<number>(5);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const boxData = {
    image:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/nft-la-gi-1.jpg",
    name: "NFT",
  };

  const [scrollData, setSrollData] = useState([
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
  ]);

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
      setSrollData((prev) => {
        if (!select) {
          return prev;
        }
        const newData = [...prev]
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
              id={index}
              image={isScroll ? boxData.image : item.image}
              name={isScroll ? boxData.name : item.name}
            />
          ))}
        </HStack>
      </ParallaxText>
      <Center>
        <Box
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
                borderWidth={"1px"}
                borderRadius={"lg"}
              >
                <NFTComponent id={index} image={item.image} name={item.name} />
                <HStack
                  w={"100%"}
                  px="0.5rem"
                  pb={"0.5rem"}
                  justifyContent={"space-between"}
                >
                  <HStack>
                    <Text>
                      Bet: <b>{item.bet}</b>
                    </Text>
                    <Image
                      w={"1rem"}
                      alt="USDT"
                      src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                    />
                  </HStack>
                  <Button colorScheme="yellow">PLAY</Button>
                </HStack>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
      </Center>
    </BaseLayout>
  );
};

export default NFTProvider;
