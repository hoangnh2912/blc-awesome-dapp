import { wrap } from "@motionone/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import $ from "jquery";
import { useEffect, useRef } from "react";
import { getCenterPointOfElement } from "../constants/utils";
import { Box, Center } from "@chakra-ui/react";

interface RouletteNFTProps {
  children: any;
  select: any;
  onScroll: (
    isScroll: boolean,
    nftElementId: string | null,
    callback: any
  ) => void;
}

function RouletteNFT({ children, select, onScroll }: RouletteNFTProps) {
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => {
    return `${wrap(-20, 0, v)}%`;
  });

  const accelerationFactor = useRef<number>(0);
  const speedFactor = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);

  useEffect(() => {
    if (select >= 0 && isScrolling.current) {
      accelerationFactor.current = -0.5;
    }
    if (select === -1) {
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
    if (speedFactor.current >= 20) {
      accelerationFactor.current = 0;
      // accelerationFactor.current = -0.1;
    }

    baseX.set(baseX.get() + speedFactor.current * 0.01);
    if (refList.current && speedFactor.current == 0 && isScrolling.current) {
      const redLineCenterItem: HTMLElement = $("#red-line-center")[0];
      const redLineCenterOffset = getCenterPointOfElement(redLineCenterItem);
      let centerItem: HTMLElement = $(".box-item")[0];
      for (const elem of $(".box-item")) {
        const offset = getCenterPointOfElement(elem);
        const centerOffset = getCenterPointOfElement(centerItem);
        if (
          Math.abs(offset.x - redLineCenterOffset.x) <=
          Math.abs(centerOffset.x - redLineCenterOffset.x)
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
                { transform: "scale(1.2)" },
                { transform: "scale(1)" },
                { transform: "scale(1.2)" },
                { transform: "scale(1)" },
              ],
              {
                easing: "ease-in-out",
                duration: 2500,
              }
            );
          });
        isScrolling.current = false;
      }
    }
  });

  return (
    <Center position={"relative"}>
      <Box
        id="red-line-center"
        position={"absolute"}
        top={"0px"}
        zIndex={1}
        w={"3px"}
        h={"280px"}
        bg={"red"}
      />
      <Box
        overflow="hidden"
        display="flex"
        flexWrap="nowrap"
        overflowX="hidden"
      >
        <motion.div ref={refList} style={{ x }}>
          {children}
        </motion.div>
      </Box>
    </Center>
  );
}
export default RouletteNFT;
