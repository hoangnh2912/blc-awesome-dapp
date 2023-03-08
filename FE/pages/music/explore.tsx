import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ListMusicComponent from "../../components/list-music";
import MusicBaseLayout from "../../layouts/music.base";
const Explore: NextPage = () => {
  const listMusic = [
    {
      id: "1",
      name: "Song Name",
      seller: "0x123...3221",
      singer: "singer 1",
      price: "0.1",
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/cf/2e/bd/cf2ebd7e-c2f0-f34a-403c-f48cc504cc65/mzaf_3313321626155365595.plus.aac.ep.m4a",
      image:
        "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "2",
      name: "Song Name 2",
      seller: "0x123...3221",
      price: "2.1",
      singer: "singer 4",
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/04/83/5f/04835f6d-276c-614b-7ccb-3c70281d9602/mzaf_9956006622821797182.plus.aac.ep.m4a",
      image:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      id: "3",
      name: "Song Name 3",
      seller: "0x123...3221",
      price: "2.1",
      singer: "singer 3",
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/82/7f/43/827f431a-6e67-55e6-c2b4-b690d06a2d3e/mzaf_4217833295358279518.plus.aac.p.m4a",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80",
    },
    {
      id: "4",
      name: "Song Name 4",
      seller: "0x123...3221",
      price: "5",
      singer: "singer 2",
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/9d/75/53/9d755300-a1c2-7a01-51d5-8ffc4b4ba642/mzaf_12119942434649250117.plus.aac.ep.m4a",
      image:
        "https://images.unsplash.com/photo-1678002219434-c6738513037e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    },
  ];

  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Text py={"5"} color="white" fontSize={["xl", "2xl"]} fontWeight="black">
        HOT NFTs
      </Text>
      <ListMusicComponent data={listMusic} />
    </MusicBaseLayout>
  );
};

export default Explore;
