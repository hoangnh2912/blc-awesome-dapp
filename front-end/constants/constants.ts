const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const USDT_ICON =
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png";
const colors = {
  gradient: {
    background:
      "radial-gradient(circle, rgba(0,1,73,1) 18%, rgba(67,0,101,1) 100%)",
    nft_box:
      "linear-gradient(83deg, rgba(43,46,255,1) 0%, rgba(179,87,168,1) 55%, rgba(108,23,122,1) 100%)",
    button:
      "linear-gradient(120deg, rgba(122,124,255,1) 12%, rgba(23,121,122,1) 100%)",
    button_hover:
      "linear-gradient(120deg, rgba(239,148,255,1) 12%, rgba(25,47,189,1) 100%)",
    active:
      "linear-gradient(90deg,rgba(51,0,148,1) 12%,rgba(221,137,255,1) 100%)",
    tether:
      "linear-gradient(50deg, rgba(0,106,66,1) 12%, rgba(34,147,104,1) 100%)",
  },
  primary: {
    select: "purple.400",
    default: "yellow.500",
    text: "yellow.100",
    polygon: "#6D28DF",
  },
};

const blurs = {
  blur2: "blur(2px)",
  blur5: "blur(5px)",
  blur10: "blur(10px)",
  blur15: "blur(15px)",
};

const mock = {
  nftData: [
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
  ],
  nftBox: {
    image:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/nft-la-gi-1.jpg",
    name: "NFT",
  },
  betSuccessHistoryData: [
    {
      nft_id: 1,
      nft_contract: "0xA2e7Bf7f42eE050de75d27d1634D2A516F9f09EB",
      total_bet: 200,
      awards: [
        {
          wallet_address: "0x62636FFD17bB80B1a7c177e5F45d774A1eE0d228",
          amount: 100,
        },
        {
          wallet_address: "0x54321FFD17bB80B1a7c177e5F45d774A1eE0d123",
          amount: 100,
        },
      ],
      number_of_bets: 20,
      number_of_winners: 2,
      at_block: 5928830,
      at: 1713261374185,
    },
    {
      nft_id: 2,
      nft_contract: "0xBc4D4a4D1878845B825Ea7e7fB1422fE266aA81D",
      total_bet: 500,
      awards: [
        {
          wallet_address: "0x62636FFD17bB80B1a7c177e5F45d774A1eE0d228",
          amount: 100,
        },
        {
          wallet_address: "0x54321FFD17bB80B1a7c177e5F45d774A1eE0d123",
          amount: 50,
        },
        {
          wallet_address: "0x54321FFD17bB80B1a7c177e5F45d774A1eE0d123",
          amount: 250,
        },
        {
          wallet_address: "0x54321FFD17bB80B1a7c177e5F45d774A1eE0d123",
          amount: 100,
        },
      ],
      number_of_bets: 50,
      number_of_winners: 4,
      at_block: 5928835,
      at: 1713261375185,
    },
  ],
};

const exampleBetUsdt = [
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 50,
  },
  {
    value: 0,
  },
];

const THIRDWEB_CLIENTID =
  "cce88ba586b9a9772e27e52376f7f39aa9fcaacc6097af98866edc47fab20cbfdc4a85d41ea11f49148cfc9fb25499d93248ef1080eec4978bc4b978b9d6770b";

export {
  THIRDWEB_CLIENTID,
  ZERO_ADDRESS,
  blurs,
  colors,
  exampleBetUsdt,
  mock,
  USDT_ICON,
};
