import { IconType } from "react-icons";
import { BsCoin, BsPeople, BsEmojiSunglasses } from "react-icons/bs";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { GiPayMoney, GiClockwork } from "react-icons/gi";
import { RxBlendingMode } from "react-icons/rx";
import { CgMusic } from "react-icons/cg";

export interface SideBarDataProps {
  name: string;
  icon: IconType;
  link: string;
  disabled?: boolean;
}

export const SideBarData: Array<SideBarDataProps> = [
  { name: "Token creator", icon: BsCoin, link: "/token-creator" },
  { name: "Steal Address", icon: BsEmojiSunglasses, link: "/steal-address" },
  { name: "Music marketplace", icon: CgMusic, link: "/music-marketplace" },
  {
    name: "AMM",
    icon: MdOutlineSwapHorizontalCircle,
    link: "/amm",
    disabled: true,
  },
  { name: "Staking", icon: GiPayMoney, link: "/staking", disabled: true },
  { name: "Renting", icon: GiClockwork, link: "/renting", disabled: true },
  { name: "DAO", icon: BsPeople, link: "/dao", disabled: true },
];

export const SideBarDataMusic: Array<SideBarDataProps> = [
  {
    name: "Explore".toUpperCase(),
    icon: MdOutlineSwapHorizontalCircle,
    link: "/music/explore",
  },
  { name: "Create".toUpperCase(), icon: RxBlendingMode, link: "/music/create" },
];
