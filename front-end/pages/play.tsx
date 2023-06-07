import { Box, Button, Center, Divider, HStack, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import NFTComponent from "../components/nft";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: any;
  select: any;
}

function ParallaxText({ children, select }: ParallaxProps) {
  const baseX = useMotionValue(0);
  // const { scrollY } = useScroll();
  // const scrollVelocity = useVelocity(scrollY);
  // const smoothVelocity = useSpring(scrollVelocity, {
  //   damping: 50,
  //   stiffness: 400,
  // });
  // const velocityFactor = useTransform(smoothVelocity, [0, 1], [0, 5], {
  //   clamp: false,
  // });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const accelerationFactor = useRef<number>(0);
  const speedFactor = useRef<number>(0);

  useEffect(() => {
    if (select) {
      speedFactor.current = 1;
      accelerationFactor.current = 0.1;
    }
  }, [select]);

  // const refList = useRef<any>();

  // useEffect(() => {
  //   if (refList.current && speedFactor.current == 0) {
  //     const element = document.elementFromPoint(window.innerWidth / 2 + 3, 225);
  //     console.log(element);
  //   }
  // }, [speedFactor]);

  useAnimationFrame((delta) => {
    speedFactor.current += accelerationFactor.current;
    speedFactor.current = Math.max(speedFactor.current, 0);

    if (speedFactor.current >= 100) {
      accelerationFactor.current = 0;
    }
    if (select != 0 && accelerationFactor.current == 0) {
      accelerationFactor.current = -0.1;
    }
    baseX.set(baseX.get() + speedFactor.current * 0.01);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */

  return (
    <>
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
      <Center>
        <Divider
          w={"3px"}
          position={"absolute"}
          zIndex={"1000"}
          top={"85px"}
          height={"380px"}
          bg={"red"}
        />
      </Center>
    </>
  );
}
const Play: NextPage = () => {
  const [select, setSelect] = useState<number>(0);

  const onSelect = (index: number) => {
    setSelect(index);
  };

  const data = [
    {
      image:
        "https://cryptonezo.com/_ipx/w_1600,f_webp/https://backend.cryptonezo.com/uploads/2022-03-25T15-19-37.034Z-bored-ape-yacht-club-bayc-crypto-nft.webp",
      name: "Bored Ape Yacht Club 1",
    },
    {
      image:
        "https://cdn.gfinityesports.com/images/ncavvykf/gfinityesports/72b75071425344d5dca2762dbeeb752b00132afe-1200x675.png?rect=0,37,1200,600&w=1200&h=600&auto=format",
      name: "Bored Ape Yacht Club 2",
    },
    {
      image:
        "https://s32659.pcdn.co/wp-content/uploads/2022/03/bayc11-850x477.png",
      name: "Bored Ape Yacht Club 3",
    },
  ];

  return (
    <BaseLayout>
      <ParallaxText select={select}>
        <HStack my={"4"} mr={"4"} gap={"2"}>
          {[...data].map((item, index) => (
            <NFTComponent key={index} image={item.image} name={item.name} />
          ))}
        </HStack>
      </ParallaxText>
      <Button onClick={() => onSelect(1)}>Bayc 1</Button>
      <Button onClick={() => onSelect(2)}>Bayc 2</Button>
      <Button onClick={() => onSelect(3)}>Bayc 3</Button>
    </BaseLayout>
  );
};

export default Play;
