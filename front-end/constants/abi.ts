export const ABI_STEALTH_ADDRESS = {
  Secp256k1: {
    address: "0x0c7B0766103bA2a6463f7b37cD19De2470B7B675",
    abi: [
      {
        inputs: [{ internalType: "uint256", name: "privKey", type: "uint256" }],
        name: "derivePubKey",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "privKey", type: "uint256" }],
        name: "deriveAddress",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "privKeyBob", type: "uint256" },
          { internalType: "uint256", name: "pubKeyAliceX", type: "uint256" },
          { internalType: "uint256", name: "pubKeyAliceY", type: "uint256" },
        ],
        name: "getStealthAddress",
        outputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "bytes", name: "", type: "bytes" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "privKey", type: "uint256" },
          { internalType: "uint256", name: "hashS", type: "uint256" },
        ],
        name: "getPrivateKeyOfStealthAddress",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
      },
    ],
    contractName: "Secp256k1",
    path: "library",
  },
  StealthAddress: {
    address: "0xfEC411171a5acfb2CD15933714e9ACDcA12bB1c6",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "x", type: "uint256" },
          { internalType: "uint256", name: "y", type: "uint256" },
        ],
        name: "setPublicKey",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_address", type: "address" },
        ],
        name: "getPublicKey",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "X", type: "uint256" },
              { internalType: "uint256", name: "Y", type: "uint256" },
            ],
            internalType: "struct PublicKey",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "privKey", type: "uint256" }],
        name: "privToPubKey",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "privKey", type: "uint256" },
          { internalType: "address", name: "to_address", type: "address" },
        ],
        name: "getStealthAddress",
        outputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "bytes", name: "", type: "bytes" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "privKey", type: "uint256" },
          { internalType: "uint256", name: "hash", type: "uint256" },
        ],
        name: "getPrivateKeyOfStealthAddress",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
      },
    ],
    contractName: "StealthAddress",
    path: "stealth-address",
  },
};

export const ABI_MUSIC = {
  MUC: {
    address: "0x4b137a387D2b4734013D6F78B4bC01aa25BD48bf",
    abi: [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "faucet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    contractName: "MUC",
    input: [],
    path: "music",
  },
  Music: {
    address: "0x3d37f86Cc018DD42112fc952B9866adE2aABfcaC",
    abi: [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "previousAdminRole",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "newAdminRole",
            type: "bytes32",
          },
        ],
        name: "RoleAdminChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "ids",
            type: "uint256[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
        ],
        name: "TransferBatch",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "TransferSingle",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "string",
            name: "value",
            type: "string",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "URI",
        type: "event",
      },
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MINTER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "id", type: "uint256" },
        ],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "accounts", type: "address[]" },
          { internalType: "uint256[]", name: "ids", type: "uint256[]" },
        ],
        name: "balanceOfBatch",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleAdmin",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256[]", name: "ids", type: "uint256[]" },
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "uri_", type: "string" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256[]", name: "ids", type: "uint256[]" },
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
          { internalType: "string[]", name: "uris_", type: "string[]" },
        ],
        name: "mintBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
        name: "uri",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    contractName: "Music",
    input: [],
    path: "music",
  },
  MusicMarket: {
    address: "0x5F0Bf78E618702aB00d2503ee792fDa2d28Fd143",
    abi: [
      {
        inputs: [
          { internalType: "contract IMuc", name: "muc", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "buyer",
            type: "address",
          },
        ],
        name: "BuySong",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        name: "ListSong",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "PauseListSong",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "UnpauseListSong",
        type: "event",
      },
      {
        inputs: [],
        name: "FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
        name: "song",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "id", type: "uint256" },
              { internalType: "uint256", name: "price", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              { internalType: "string", name: "uri", type: "string" },
              { internalType: "address", name: "seller", type: "address" },
              { internalType: "bool", name: "paused", type: "bool" },
            ],
            internalType: "struct IMusicMarket.Song",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "uri", type: "string" },
        ],
        name: "listSong",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256[]", name: "id", type: "uint256[]" },
          { internalType: "uint256[]", name: "price", type: "uint256[]" },
          { internalType: "uint256[]", name: "amount", type: "uint256[]" },
          { internalType: "string[]", name: "uri", type: "string[]" },
        ],
        name: "listSongs",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "contract IMusic", name: "token", type: "address" },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "buySong",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
        name: "pauseListSong",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
        name: "unpauseListSong",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    contractName: "MusicMarket",
    input: ["0x4b137a387D2b4734013D6F78B4bC01aa25BD48bf"],
    path: "music",
  },
};

export const ABI_CMD = {
  CMDReward: {
    address: "0xF128e3D400cf8F8B422E65989bC03Fc2f78E3884",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "blockUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "chatMind",
            type: "address",
          },
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "BlockUser",
        type: "event",
      },
      {
        inputs: [],
        name: "claimReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "ClaimReward",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "activePoints",
            type: "uint256[]",
          },
        ],
        name: "increaseBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newAdmin",
            type: "address",
          },
        ],
        name: "setNewAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "totalReward",
            type: "uint256",
          },
        ],
        name: "setTotalReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "unblockUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "UnblockUser",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "points",
            type: "uint256[]",
          },
        ],
        name: "UpdateActivePoints",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        name: "UpdateActiveReward",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        name: "UpdateAdmin",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "totalReward",
            type: "uint256",
          },
        ],
        name: "UpdateTotalReward",
        type: "event",
      },
      {
        inputs: [],
        name: "balanceOfPool",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "getActivePoints",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "getActiveReward",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isBlocked",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    contractName: "ChatMindReward",
  },
  CMDERC20: {
    address: "0x93b242539b6652163d72ecd20b347a965e6280a2",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "chatMind", type: "address" },
          { internalType: "address", name: "admin", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "BlockUser",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "ClaimReward",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "UnblockUser",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "points",
            type: "uint256[]",
          },
        ],
        name: "UpdateActivePoints",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        name: "UpdateActiveReward",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        name: "UpdateAdmin",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "totalReward",
            type: "uint256",
          },
        ],
        name: "UpdateTotalReward",
        type: "event",
      },
      {
        inputs: [],
        name: "balanceOfPool",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "blockUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "claimReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "getActivePoints",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "getActiveReward",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "accounts", type: "address[]" },
          {
            internalType: "uint256[]",
            name: "activePoints",
            type: "uint256[]",
          },
        ],
        name: "increaseBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isBlocked",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newAdmin", type: "address" },
        ],
        name: "setNewAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "totalReward", type: "uint256" },
        ],
        name: "setTotalReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "unblockUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    contractName: "CMD",
  },
};
