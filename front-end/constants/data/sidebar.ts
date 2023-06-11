import { IconType } from "react-icons";
import { BsCoin, BsEmojiSunglasses } from "react-icons/bs";

export interface SideBarDataProps {
  name: string;
  icon: IconType;
  link: string;
  disabled?: boolean;
}

export const SideBarData: Array<SideBarDataProps> = [
  { name: "Play", icon: BsCoin, link: "/play" },
  {
    name: "NFT provider",
    icon: BsEmojiSunglasses,
    link: "/nft-provider",
  },
];
