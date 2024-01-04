import { IconType } from "react-icons";
import { BsCoin, BsPeople, BsEmojiSunglasses } from "react-icons/bs";
import {
  MdExplore,
  MdLibraryAdd,
  MdOutlineSwapHorizontalCircle,
  MdPlaylistPlay,
} from "react-icons/md";
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
  {
    name: "Stealth Address",
    icon: BsEmojiSunglasses,
    link: "/stealth-address",
  },
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
    icon: MdExplore,
    link: "/music/explore",
  },
  {
    name: "Playlist".toUpperCase(),
    icon: MdPlaylistPlay,
    link: "/music/playlist",
  },
  { name: "Create".toUpperCase(), icon: MdLibraryAdd, link: "/music/create" },
];
