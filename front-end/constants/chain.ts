const mchverse = {
  name: "MCHVerse",
  title: "MCHVerse",
  chain: "MCHVerse",
  icon: {
    url: "https://hub.oasys.games/_next/image?url=%2Fimages%2Fverse%2Fmch_small.png&w=1920&q=75",
    height: 512,
    width: 512,
    format: "webp",
  },
  rpc: ["https://rpc.oasys.mycryptoheroes.net"],
  faucets: [],
  nativeCurrency: {
    name: "OAS",
    symbol: "OAS",
    decimals: 18,
  },
  infoURL: "https://www.mycryptoheroes.net/",
  shortName: "mch",
  chainId: 29548,
  networkId: 29548,
  explorers: [
    {
      name: "mycryptoheroes",
      url: "https://explorer.oasys.mycryptoheroes.net",
      standard: "EIP3091",
    },
  ],
  testnet: false,
  slug: "mchverse",
};

const tcgverse = {
  name: "TCG Verse Mainnet",
  title: "TCG Verse Mainnet",
  chain: "TCG Verse Mainnet",
  icon: {
    url: "https://hub.oasys.games/_next/image?url=%2Fimages%2Fverse%2Ftcgv_logo.jpeg&w=1920&q=75",
    height: 512,
    width: 512,
    format: "webp",
  },
  rpc: ["https://rpc.tcgverse.xyz"],
  faucets: [],
  nativeCurrency: {
    name: "OAS",
    symbol: "OAS",
    decimals: 18,
  },
  infoURL: "https://tcgverse.xyz/",
  shortName: "tcg",
  chainId: 2400,
  networkId: 2400,
  explorers: [
    {
      name: "tcgverse",
      url: "https://explorer.tcgverse.xyz",
      standard: "EIP3091",
    },
  ],
  testnet: false,
  slug: "tcgverse",
};

const chainverse = {
  name: "Chain Verse Mainnet",
  title: "Chain Verse Mainnet",
  chain: "Chain Verse Mainnet",
  icon: {
    url: "https://hub.oasys.games/_next/image?url=%2Fimages%2Fverse%2Fchainverse.svg&w=1920&q=75",
    height: 512,
    width: 512,
    format: "webp",
  },
  rpc: ["https://rpc.chainverse.info"],
  faucets: [],
  nativeCurrency: {
    name: "OAS",
    symbol: "OAS",
    decimals: 18,
  },
  infoURL: "https://www.chainverse.info/",
  shortName: "chainverse",
  chainId: 5555,
  networkId: 5555,
  explorers: [
    {
      name: "chainverse",
      url: "https://explorer.chainverse.info",
      standard: "EIP3091",
    },
  ],
  testnet: false,
  slug: "chainverse",
};

const homeverse = {
  name: "HOME Verse Mainnet",
  title: "HOME Verse Mainnet",
  chain: "HOME Verse Mainnet",
  icon: {
    url: "https://hub.oasys.games/_next/image?url=%2Fimages%2Fverse%2Fhmv_logo_mv.png&w=1920&q=75",
    height: 512,
    width: 512,
    format: "webp",
  },
  rpc: ["https://rpc.mainnet.oasys.homeverse.games"],
  faucets: [],
  nativeCurrency: {
    name: "OAS",
    symbol: "OAS",
    decimals: 18,
  },
  infoURL: "https://www.homeverse.games/",
  shortName: "homeverse",
  chainId: 5555,
  networkId: 5555,
  explorers: [
    {
      name: "homeverse",
      url: "https://explorer.oasys.homeverse.games",
      standard: "EIP3091",
    },
  ],
  testnet: false,
  slug: "homeverse",
};
const saakuruverse = {
  name: "Saakuru Mainnet",
  title: "Saakuru Mainnet",
  chain: "Saakuru Mainnet",
  icon: {
    url: "https://hub.oasys.games/_next/image?url=%2Fimages%2Fverse%2Fsaakuru_logo.jpeg&w=1920&q=75",
    height: 512,
    width: 512,
    format: "webp",
  },
  rpc: ["https://rpc.saakuru.network"],
  faucets: [],
  nativeCurrency: {
    name: "OAS",
    symbol: "OAS",
    decimals: 18,
  },
  infoURL: "https://saakuru.network",
  shortName: "saakuruverse",
  chainId: 7225878,
  networkId: 7225878,
  explorers: [
    {
      name: "saakuruverse",
      url: "https://explorer.saakuru.network",
      standard: "EIP3091",
    },
  ],
  testnet: false,
  slug: "saakuruverse",
};

const listChainId = [
  mchverse.chainId,
  tcgverse.chainId,
  chainverse.chainId,
  homeverse.chainId,
  saakuruverse.chainId,
];
export { mchverse, tcgverse, chainverse, homeverse, saakuruverse, listChainId };
