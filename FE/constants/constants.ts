import { useColorModeValue } from "@chakra-ui/react";

const NO_AVATAR =
  "https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0";

const COLOR_INFO = () => {
  const BG_COLOR_INFO = useColorModeValue("gray.200", "gray.700");
  const BORDER_COLOR_INFO = useColorModeValue("gray.300", "gray.600");
  const TEXT_COLOR_INFO = useColorModeValue("gray.700", "gray.100");

  return {
    BG_COLOR_INFO,
    BORDER_COLOR_INFO,
    TEXT_COLOR_INFO,
  };
};

export { NO_AVATAR, COLOR_INFO };
