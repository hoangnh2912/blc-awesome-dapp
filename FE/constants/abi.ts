export const ABI_STEAL_ADDRESS = {
  Secp256k1: {
    address: "0x6902BaEd66AaFDFD81574fbe4dFe10E7b154afE5",
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
          {
            internalType: "uint256",
            name: "privKeyBob",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubKeyAliceX",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubKeyAliceY",
            type: "uint256",
          },
        ],
        name: "getStealAddress",
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
        name: "getPrivateKeyOfStealAddress",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
      },
    ],
    contractName: "Secp256k1",
    path: "library",
  },
  StealAddress: {
    address: "0xDB1577c0b4E0099cDe57dF1A9bFE42CF53566901",
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
        name: "getStealAddress",
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
        name: "getPrivateKeyOfStealAddress",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
      },
    ],
    contractName: "StealAddress",
    path: "steal-address",
  },
};

export const ABI_MUSIC = {
  MUC: {
    address: "0x552092B922144030421C6ECaaa9EC7B92B31b9fF",
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
    address: "0xaD51523D62b0AD26280c2B3F6721f4E888B44A6C",
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
    address: "0x8C4cE4fB850A201FD6b9df0D1f96D7459d9e7873",
    abi: [
      {
        inputs: [
          { internalType: "contract IERC20", name: "muc", type: "address" },
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
          { internalType: "contract IMusic", name: "token", type: "address" },
          { internalType: "uint256", name: "id", type: "uint256" },
        ],
        name: "buySong",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    contractName: "MusicMarket",
    input: ["0x552092B922144030421C6ECaaa9EC7B92B31b9fF"],
    path: "music",
  },
};

export const ABI_DAO = {
  TimelockController: {
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_minDelay",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "_proposers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "_executors",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "_admin",
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
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "CallExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "delay",
            type: "uint256",
          },
        ],
        name: "CallScheduled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "Cancelled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldDuration",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newDuration",
            type: "uint256",
          },
        ],
        name: "MinDelayChange",
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
        inputs: [],
        name: "CANCELLER_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "EXECUTOR_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "PROPOSER_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "TIMELOCK_ADMIN_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "cancel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "payload",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "payloads",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "getMinDelay",
        outputs: [
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
        ],
        name: "getRoleAdmin",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "getTimestamp",
        outputs: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasRole",
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
        inputs: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
        ],
        name: "hashOperation",
        outputs: [
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "payloads",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
        ],
        name: "hashOperationBatch",
        outputs: [
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "isOperation",
        outputs: [
          {
            internalType: "bool",
            name: "registered",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "isOperationDone",
        outputs: [
          {
            internalType: "bool",
            name: "done",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "isOperationPending",
        outputs: [
          {
            internalType: "bool",
            name: "pending",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "isOperationReady",
        outputs: [
          {
            internalType: "bool",
            name: "ready",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "delay",
            type: "uint256",
          },
        ],
        name: "schedule",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "payloads",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "predecessor",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "delay",
            type: "uint256",
          },
        ],
        name: "scheduleBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
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
        inputs: [
          {
            internalType: "uint256",
            name: "newDelay",
            type: "uint256",
          },
        ],
        name: "updateDelay",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x60806040523480156200001157600080fd5b5060405162002b7238038062002b72833981016040819052620000349162000410565b838380836200005360008051602062002af28339815191528062000235565b6200007d60008051602062002b1283398151915260008051602062002af283398151915262000235565b620000a760008051602062002b3283398151915260008051602062002af283398151915262000235565b620000d160008051602062002b5283398151915260008051602062002af283398151915262000235565b620000ec60008051602062002af28339815191523062000280565b6001600160a01b0381161562000117576200011760008051602062002af28339815191528262000280565b60005b83518110156200019d576200016160008051602062002b128339815191528583815181106200014d576200014d62000497565b60200260200101516200028060201b60201c565b6200018a60008051602062002b528339815191528583815181106200014d576200014d62000497565b6200019581620004ad565b90506200011a565b5060005b8251811015620001e757620001d460008051602062002b328339815191528483815181106200014d576200014d62000497565b620001df81620004ad565b9050620001a1565b5060028490556040805160008152602081018690527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a15050505050505050620004d5565b600082815260208190526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6200028c828262000290565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200028c576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620002ec3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200035e57600080fd5b919050565b600082601f8301126200037557600080fd5b815160206001600160401b038083111562000394576200039462000330565b8260051b604051601f19603f83011681018181108482111715620003bc57620003bc62000330565b604052938452858101830193838101925087851115620003db57600080fd5b83870191505b848210156200040557620003f58262000346565b83529183019190830190620003e1565b979650505050505050565b600080600080608085870312156200042757600080fd5b845160208601519094506001600160401b03808211156200044757600080fd5b620004558883890162000363565b945060408701519150808211156200046c57600080fd5b506200047b8782880162000363565b9250506200048c6060860162000346565b905092959194509250565b634e487b7160e01b600052603260045260246000fd5b600060018201620004ce57634e487b7160e01b600052601160045260246000fd5b5060010190565b61260d80620004e56000396000f3fe6080604052600436106101bb5760003560e01c80638065657f116100ec578063bc197c811161008a578063d547741f11610064578063d547741f146105fd578063e38335e51461061d578063f23a6e6114610630578063f27a0c921461067557600080fd5b8063bc197c811461056b578063c4d252f5146105b0578063d45c4435146105d057600080fd5b806391d14854116100c657806391d14854146104b1578063a217fddf14610502578063b08e51c014610517578063b1c5f4271461054b57600080fd5b80638065657f1461043d5780638f2a0bb01461045d5780638f61f4f51461047d57600080fd5b8063248a9ca31161015957806331d507501161013357806331d50750146103bd57806336568abe146103dd578063584b153e146103fd57806364d623531461041d57600080fd5b8063248a9ca31461033c5780632ab0f5291461036c5780632f2ff15d1461039d57600080fd5b80630d3cf6fc116101955780630d3cf6fc14610260578063134008d31461029457806313bc9f20146102a7578063150b7a02146102c757600080fd5b806301d5062a146101c757806301ffc9a7146101e957806307bd02651461021e57600080fd5b366101c257005b600080fd5b3480156101d357600080fd5b506101e76101e2366004611b06565b61068a565b005b3480156101f557600080fd5b50610209610204366004611b7b565b61071f565b60405190151581526020015b60405180910390f35b34801561022a57600080fd5b506102527fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e6381565b604051908152602001610215565b34801561026c57600080fd5b506102527f5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca581565b6101e76102a2366004611bbd565b61077b565b3480156102b357600080fd5b506102096102c2366004611c29565b610873565b3480156102d357600080fd5b5061030b6102e2366004611d4e565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff000000000000000000000000000000000000000000000000000000009091168152602001610215565b34801561034857600080fd5b50610252610357366004611c29565b60009081526020819052604090206001015490565b34801561037857600080fd5b50610209610387366004611c29565b6000908152600160208190526040909120541490565b3480156103a957600080fd5b506101e76103b8366004611db6565b610899565b3480156103c957600080fd5b506102096103d8366004611c29565b6108c3565b3480156103e957600080fd5b506101e76103f8366004611db6565b6108dc565b34801561040957600080fd5b50610209610418366004611c29565b610994565b34801561042957600080fd5b506101e7610438366004611c29565b6109aa565b34801561044957600080fd5b50610252610458366004611bbd565b610a7a565b34801561046957600080fd5b506101e7610478366004611e27565b610ab9565b34801561048957600080fd5b506102527fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc181565b3480156104bd57600080fd5b506102096104cc366004611db6565b60009182526020828152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b34801561050e57600080fd5b50610252600081565b34801561052357600080fd5b506102527ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f78381565b34801561055757600080fd5b50610252610566366004611ed9565b610ceb565b34801561057757600080fd5b5061030b610586366004612002565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b3480156105bc57600080fd5b506101e76105cb366004611c29565b610d30565b3480156105dc57600080fd5b506102526105eb366004611c29565b60009081526001602052604090205490565b34801561060957600080fd5b506101e7610618366004611db6565b610e2b565b6101e761062b366004611ed9565b610e50565b34801561063c57600080fd5b5061030b61064b3660046120ac565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b34801561068157600080fd5b50600254610252565b7fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc16106b4816110fd565b60006106c4898989898989610a7a565b90506106d0818461110a565b6000817f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8b8b8b8b8b8a60405161070c9695949392919061215a565b60405180910390a3505050505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e0000000000000000000000000000000000000000000000000000000001480610775575061077582611252565b92915050565b600080527fdae2aa361dfd1ca020a396615627d436107c35eff9fe7738a3512819782d70696020527f5ba6852781629bcdcd4bdaa6de76d786f1c64b16acdac474e55bebc0ea157951547fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e639060ff166107f8576107f881336112e9565b6000610808888888888888610a7a565b905061081481856113a1565b610820888888886114de565b6000817fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b588a8a8a8a60405161085894939291906121a5565b60405180910390a3610869816115e2565b5050505050505050565b6000818152600160205260408120546001811180156108925750428111155b9392505050565b6000828152602081905260409020600101546108b4816110fd565b6108be838361168b565b505050565b60008181526001602052604081205481905b1192915050565b73ffffffffffffffffffffffffffffffffffffffff81163314610986576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b610990828261177b565b5050565b60008181526001602081905260408220546108d5565b333014610a39576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f54696d656c6f636b436f6e74726f6c6c65723a2063616c6c6572206d7573742060448201527f62652074696d656c6f636b000000000000000000000000000000000000000000606482015260840161097d565b60025460408051918252602082018390527f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5910160405180910390a1600255565b6000868686868686604051602001610a979695949392919061215a565b6040516020818303038152906040528051906020012090509695505050505050565b7fb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1610ae3816110fd565b888714610b72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d6160448201527f7463680000000000000000000000000000000000000000000000000000000000606482015260840161097d565b888514610c01576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d6160448201527f7463680000000000000000000000000000000000000000000000000000000000606482015260840161097d565b6000610c138b8b8b8b8b8b8b8b610ceb565b9050610c1f818461110a565b60005b8a811015610cdd5780827f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8e8e85818110610c5f57610c5f6121e5565b9050602002016020810190610c749190612214565b8d8d86818110610c8657610c866121e5565b905060200201358c8c87818110610c9f57610c9f6121e5565b9050602002810190610cb1919061222f565b8c8b604051610cc59695949392919061215a565b60405180910390a3610cd6816122c3565b9050610c22565b505050505050505050505050565b60008888888888888888604051602001610d0c9897969594939291906123ab565b60405160208183030381529060405280519060200120905098975050505050505050565b7ffd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783610d5a816110fd565b610d6382610994565b610def576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20636160448201527f6e6e6f742062652063616e63656c6c6564000000000000000000000000000000606482015260840161097d565b6000828152600160205260408082208290555183917fbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb7091a25050565b600082815260208190526040902060010154610e46816110fd565b6108be838361177b565b600080527fdae2aa361dfd1ca020a396615627d436107c35eff9fe7738a3512819782d70696020527f5ba6852781629bcdcd4bdaa6de76d786f1c64b16acdac474e55bebc0ea157951547fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e639060ff16610ecd57610ecd81336112e9565b878614610f5c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d6160448201527f7463680000000000000000000000000000000000000000000000000000000000606482015260840161097d565b878414610feb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d6160448201527f7463680000000000000000000000000000000000000000000000000000000000606482015260840161097d565b6000610ffd8a8a8a8a8a8a8a8a610ceb565b905061100981856113a1565b60005b898110156110e75760008b8b83818110611028576110286121e5565b905060200201602081019061103d9190612214565b905060008a8a84818110611053576110536121e5565b9050602002013590503660008a8a86818110611071576110716121e5565b9050602002810190611083919061222f565b91509150611093848484846114de565b84867fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58868686866040516110ca94939291906121a5565b60405180910390a350505050806110e0906122c3565b905061100c565b506110f1816115e2565b50505050505050505050565b61110781336112e9565b50565b611113826108c3565b156111a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20616c60448201527f7265616479207363686564756c65640000000000000000000000000000000000606482015260840161097d565b600254811015611232576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f54696d656c6f636b436f6e74726f6c6c65723a20696e73756666696369656e7460448201527f2064656c61790000000000000000000000000000000000000000000000000000606482015260840161097d565b61123c8142612472565b6000928352600160205260409092209190915550565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061077557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610775565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166109905761132781611832565b611332836020611851565b6040516020016113439291906124a9565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261097d9160040161252a565b6113aa82610873565b611436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20697360448201527f206e6f7420726561647900000000000000000000000000000000000000000000606482015260840161097d565b8015806114525750600081815260016020819052604090912054145b610990576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f54696d656c6f636b436f6e74726f6c6c65723a206d697373696e67206465706560448201527f6e64656e63790000000000000000000000000000000000000000000000000000606482015260840161097d565b60008473ffffffffffffffffffffffffffffffffffffffff1684848460405161150892919061257b565b60006040518083038185875af1925050503d8060008114611545576040519150601f19603f3d011682016040523d82523d6000602084013e61154a565b606091505b50509050806115db576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f54696d656c6f636b436f6e74726f6c6c65723a20756e6465726c79696e67207460448201527f72616e73616374696f6e20726576657274656400000000000000000000000000606482015260840161097d565b5050505050565b6115eb81610873565b611677576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20697360448201527f206e6f7420726561647900000000000000000000000000000000000000000000606482015260840161097d565b600090815260016020819052604090912055565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166109905760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905561171d3390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16156109905760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b606061077573ffffffffffffffffffffffffffffffffffffffff831660145b6060600061186083600261258b565b61186b906002612472565b67ffffffffffffffff81111561188357611883611c42565b6040519080825280601f01601f1916602001820160405280156118ad576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106118e4576118e46121e5565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611947576119476121e5565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600061198384600261258b565b61198e906001612472565b90505b6001811115611a2b577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106119cf576119cf6121e5565b1a60f81b8282815181106119e5576119e56121e5565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c93611a24816125a2565b9050611991565b508315610892576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161097d565b803573ffffffffffffffffffffffffffffffffffffffff81168114611ab857600080fd5b919050565b60008083601f840112611acf57600080fd5b50813567ffffffffffffffff811115611ae757600080fd5b602083019150836020828501011115611aff57600080fd5b9250929050565b600080600080600080600060c0888a031215611b2157600080fd5b611b2a88611a94565b965060208801359550604088013567ffffffffffffffff811115611b4d57600080fd5b611b598a828b01611abd565b989b979a50986060810135976080820135975060a09091013595509350505050565b600060208284031215611b8d57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461089257600080fd5b60008060008060008060a08789031215611bd657600080fd5b611bdf87611a94565b955060208701359450604087013567ffffffffffffffff811115611c0257600080fd5b611c0e89828a01611abd565b979a9699509760608101359660809091013595509350505050565b600060208284031215611c3b57600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611cb857611cb8611c42565b604052919050565b600082601f830112611cd157600080fd5b813567ffffffffffffffff811115611ceb57611ceb611c42565b611d1c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611c71565b818152846020838601011115611d3157600080fd5b816020850160208301376000918101602001919091529392505050565b60008060008060808587031215611d6457600080fd5b611d6d85611a94565b9350611d7b60208601611a94565b925060408501359150606085013567ffffffffffffffff811115611d9e57600080fd5b611daa87828801611cc0565b91505092959194509250565b60008060408385031215611dc957600080fd5b82359150611dd960208401611a94565b90509250929050565b60008083601f840112611df457600080fd5b50813567ffffffffffffffff811115611e0c57600080fd5b6020830191508360208260051b8501011115611aff57600080fd5b600080600080600080600080600060c08a8c031215611e4557600080fd5b893567ffffffffffffffff80821115611e5d57600080fd5b611e698d838e01611de2565b909b50995060208c0135915080821115611e8257600080fd5b611e8e8d838e01611de2565b909950975060408c0135915080821115611ea757600080fd5b50611eb48c828d01611de2565b9a9d999c50979a969997986060880135976080810135975060a0013595509350505050565b60008060008060008060008060a0898b031215611ef557600080fd5b883567ffffffffffffffff80821115611f0d57600080fd5b611f198c838d01611de2565b909a50985060208b0135915080821115611f3257600080fd5b611f3e8c838d01611de2565b909850965060408b0135915080821115611f5757600080fd5b50611f648b828c01611de2565b999c989b509699959896976060870135966080013595509350505050565b600082601f830112611f9357600080fd5b8135602067ffffffffffffffff821115611faf57611faf611c42565b8160051b611fbe828201611c71565b9283528481018201928281019087851115611fd857600080fd5b83870192505b84831015611ff757823582529183019190830190611fde565b979650505050505050565b600080600080600060a0868803121561201a57600080fd5b61202386611a94565b945061203160208701611a94565b9350604086013567ffffffffffffffff8082111561204e57600080fd5b61205a89838a01611f82565b9450606088013591508082111561207057600080fd5b61207c89838a01611f82565b9350608088013591508082111561209257600080fd5b5061209f88828901611cc0565b9150509295509295909350565b600080600080600060a086880312156120c457600080fd5b6120cd86611a94565b94506120db60208701611a94565b93506040860135925060608601359150608086013567ffffffffffffffff81111561210557600080fd5b61209f88828901611cc0565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b73ffffffffffffffffffffffffffffffffffffffff8716815285602082015260a06040820152600061219060a083018688612111565b60608301949094525060800152949350505050565b73ffffffffffffffffffffffffffffffffffffffff851681528360208201526060604082015260006121db606083018486612111565b9695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561222657600080fd5b61089282611a94565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261226457600080fd5b83018035915067ffffffffffffffff82111561227f57600080fd5b602001915036819003821315611aff57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036122f4576122f4612294565b5060010190565b81835260006020808501808196508560051b810191508460005b8781101561239e57828403895281357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe188360301811261235457600080fd5b8701858101903567ffffffffffffffff81111561237057600080fd5b80360382131561237f57600080fd5b61238a868284612111565b9a87019a9550505090840190600101612315565b5091979650505050505050565b60a0808252810188905260008960c08301825b8b8110156123f95773ffffffffffffffffffffffffffffffffffffffff6123e484611a94565b168252602092830192909101906001016123be565b5083810360208501528881527f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff89111561243257600080fd5b8860051b9150818a6020830137018281036020908101604085015261245a90820187896122fb565b60608401959095525050608001529695505050505050565b8082018082111561077557610775612294565b60005b838110156124a0578181015183820152602001612488565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516124e1816017850160208801612485565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161251e816028840160208801612485565b01602801949350505050565b6020815260008251806020840152612549816040850160208701612485565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b8183823760009101908152919050565b808202811582820484141761077557610775612294565b6000816125b1576125b1612294565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019056fea2646970667358221220c167bf652464b935d1ca0e3d5e991921f05c570dcb0d209a85f2df3cedb8d5a964736f6c634300081100335f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5b09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1d8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63fd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783",
  },
  GovernorQuorumFractionNonTimelock: {
    abi: [
      {
        inputs: [
          {
            internalType: "contract IVotes",
            name: "_token",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_votingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_votingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_proposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_quorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_tokenDecimals",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "Empty",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalCanceled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            indexed: false,
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          {
            indexed: false,
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "ProposalCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldQuorumNumerator",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newQuorumNumerator",
            type: "uint256",
          },
        ],
        name: "QuorumNumeratorUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "VoteCast",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "VoteCastWithParams",
        type: "event",
      },
      {
        inputs: [],
        name: "BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "COUNTING_MODE",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "EXTENDED_BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
        ],
        name: "castVote",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "castVoteWithReason",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "castVoteWithReasonAndParams",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteWithReasonAndParamsBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "execute",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "getVotes",
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
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "getVotesWithParams",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasVoted",
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
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "hashProposal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalDeadline",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalSnapshot",
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
        inputs: [],
        name: "proposalThreshold",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalVotes",
        outputs: [
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "forVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "abstainVotes",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "propose",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorum",
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
        inputs: [],
        name: "quorumDenominator",
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
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorumNumerator",
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
        inputs: [],
        name: "quorumNumerator",
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
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "relay",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "state",
        outputs: [
          {
            internalType: "enum IGovernor.ProposalState",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
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
        name: "token",
        outputs: [
          {
            internalType: "contract IVotes",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newQuorumNumerator",
            type: "uint256",
          },
        ],
        name: "updateQuorumNumerator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "votingDelay",
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
        inputs: [],
        name: "votingPeriod",
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
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x6101606040523480156200001257600080fd5b50604051620044e5380380620044e5833981016040819052620000359162000620565b81878780620000586040805180820190915260018152603160f81b602082015290565b815160209283012081519183019190912060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818801819052818301969096526060810194909452608080850193909352308483018190528151808603909301835260c094850190915281519190950120905291909152610120526000620000f58282620007d4565b50506001600160a01b0316610140526200010f816200012c565b5060079290925550600892909255600955600a5550620008c89050565b6064811115620001b55760405162461bcd60e51b815260206004820152604360248201527f476f7665726e6f72566f74657351756f72756d4672616374696f6e3a2071756f60448201527f72756d4e756d657261746f72206f7665722071756f72756d44656e6f6d696e616064820152623a37b960e91b608482015260a4015b60405180910390fd5b6000620001c1620002a8565b90508015801590620001d35750600654155b156200024e5760066000016040518060400160405280600063ffffffff1681526020016200020c84620002e060201b620016ba1760201c565b6001600160e01b0390811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b620002698260066200034f60201b6200176c1790919060201c565b505060408051828152602081018490527f0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997910160405180910390a15050565b60065460009015620002d957620002cb6006620003a260201b620017b71760201c565b6001600160e01b0316905090565b5060055490565b60006001600160e01b038211156200034b5760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b6064820152608401620001ac565b5090565b6000806200038c846000016200037043620003f060201b620018141760201c565b6200038686620002e060201b620016ba1760201c565b62000457565b6001600160e01b03918216969116945092505050565b80546000908015620003e657620003ce83620003c0600184620008a0565b600091825260209091200190565b5464010000000090046001600160e01b0316620003e9565b60005b9392505050565b600063ffffffff8211156200034b5760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b6064820152608401620001ac565b825460009081908015620005ac5760006200047987620003c0600185620008a0565b60408051808201909152905463ffffffff8082168084526401000000009092046001600160e01b031660208401529192509087161015620004fd5760405162461bcd60e51b815260206004820152601760248201527f436865636b706f696e743a20696e76616c6964206b65790000000000000000006044820152606401620001ac565b805163ffffffff8088169116036200054b57846200052288620003c0600186620008a0565b80546001600160e01b03929092166401000000000263ffffffff9092169190911790556200059b565b6040805180820190915263ffffffff80881682526001600160e01b0380881660208085019182528b54600181018d5560008d81529190912094519151909216640100000000029216919091179101555b602001519250839150620006029050565b50506040805180820190915263ffffffff80851682526001600160e01b0380851660208085019182528854600181018a5560008a8152918220955192519093166401000000000291909316179201919091559050815b935093915050565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a0312156200063c57600080fd5b87516001600160a01b03811681146200065457600080fd5b602089810151919850906001600160401b03808211156200067457600080fd5b818b0191508b601f8301126200068957600080fd5b8151818111156200069e576200069e6200060a565b604051601f8201601f19908116603f01168101908382118183101715620006c957620006c96200060a565b816040528281528e86848701011115620006e257600080fd5b600093505b82841015620007065784840186015181850187015292850192620006e7565b600092810190950191909152505050604089015160608a015160808b015160a08c015160c0909c01519a9d939c50919a90999198509650945092505050565b600181811c908216806200075a57607f821691505b6020821081036200077b57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620007cf57600081815260208120601f850160051c81016020861015620007aa5750805b601f850160051c820191505b81811015620007cb57828155600101620007b6565b5050505b505050565b81516001600160401b03811115620007f057620007f06200060a565b620008088162000801845462000745565b8462000781565b602080601f831160018114620008405760008415620008275750858301515b600019600386901b1c1916600185901b178555620007cb565b600085815260208120601f198616915b82811015620008715788860151825594840194600190910190840162000850565b5085821015620008905787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b81810381811115620008c257634e487b7160e01b600052601160045260246000fd5b92915050565b60805160a05160c05160e051610100516101205161014051613bb462000931600039600081816107b80152818161212501526121e7015260006125270152600061257601526000612551015260006124aa015260006124d4015260006124fe0152613bb46000f3fe60806040526004361061021d5760003560e01c806360c4247f1161011d578063c01f9e37116100b0578063deaaa7cc1161007f578063f23a6e6111610064578063f23a6e6114610741578063f8ce560a14610786578063fc0c546a146107a657600080fd5b8063deaaa7cc146106ed578063eb9019d41461072157600080fd5b8063c01f9e3714610654578063c28bc2fa14610674578063c59057e414610687578063dd4e2ba5146106a757600080fd5b80639a802a6d116100ec5780639a802a6d146105c5578063a7713a70146105e5578063b58131b0146105fa578063bc197c811461060f57600080fd5b806360c4247f146105515780637b3c71d3146105715780637d5e81e21461059157806397c3d334146105b157600080fd5b80632fe3e261116101b0578063438596321161017f57806354fd4d501161016457806354fd4d50146104cb57806356781388146105115780635f398a141461053157600080fd5b8063438596321461041f578063544ffc9c1461047657600080fd5b80632fe3e261146103895780633932abb1146103bd5780633bccf4fd146103d25780633e4f49e6146103f257600080fd5b806306fdde03116101ec57806306fdde03146102bf578063150b7a02146102e15780632656227d146103565780632d63f6931461036957600080fd5b806301ffc9a71461022b57806302a251a314610260578063034201811461027f57806306f3f9e61461029f57600080fd5b3661022657005b005b600080fd5b34801561023757600080fd5b5061024b610246366004612bb5565b6107ff565b60405190151581526020015b60405180910390f35b34801561026c57600080fd5b506009545b604051908152602001610257565b34801561028b57600080fd5b5061027161029a366004612d63565b610930565b3480156102ab57600080fd5b506102246102ba366004612e0a565b610a28565b3480156102cb57600080fd5b506102d4610ab9565b6040516102579190612e91565b3480156102ed57600080fd5b506103256102fc366004612ec8565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff000000000000000000000000000000000000000000000000000000009091168152602001610257565b6102716103643660046130a1565b610b4b565b34801561037557600080fd5b50610271610384366004612e0a565b610cc6565b34801561039557600080fd5b506102717fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af8881565b3480156103c957600080fd5b50600854610271565b3480156103de57600080fd5b506102716103ed366004613131565b610cff565b3480156103fe57600080fd5b5061041261040d366004612e0a565b610d75565b60405161025791906131ae565b34801561042b57600080fd5b5061024b61043a3660046131ef565b600082815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845260030190915290205460ff1692915050565b34801561048257600080fd5b506104b0610491366004612e0a565b6000908152600460205260409020805460018201546002909201549092565b60408051938452602084019290925290820152606001610257565b3480156104d757600080fd5b5060408051808201909152600181527f310000000000000000000000000000000000000000000000000000000000000060208201526102d4565b34801561051d57600080fd5b5061027161052c36600461321b565b610e9e565b34801561053d57600080fd5b5061027161054c36600461323e565b610ec7565b34801561055d57600080fd5b5061027161056c366004612e0a565b610f11565b34801561057d57600080fd5b5061027161058c3660046132c2565b610fd3565b34801561059d57600080fd5b506102716105ac36600461331c565b611025565b3480156105bd57600080fd5b506064610271565b3480156105d157600080fd5b506102716105e03660046133d1565b611472565b3480156105f157600080fd5b50610271611489565b34801561060657600080fd5b506102716114ca565b34801561061b57600080fd5b5061032561062a366004613428565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b34801561066057600080fd5b5061027161066f366004612e0a565b6114e8565b6102246106823660046134b8565b611518565b34801561069357600080fd5b506102716106a23660046130a1565b611636565b3480156106b357600080fd5b506040805180820190915260208082527f737570706f72743d627261766f2671756f72756d3d666f722c6162737461696e908201526102d4565b3480156106f957600080fd5b506102717f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f81565b34801561072d57600080fd5b5061027161073c3660046134fa565b61168e565b34801561074d57600080fd5b5061032561075c366004613524565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b34801561079257600080fd5b506102716107a1366004612e0a565b6116af565b3480156107b257600080fd5b506107da7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610257565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fbf26d89700000000000000000000000000000000000000000000000000000000148061089257507fffffffff0000000000000000000000000000000000000000000000000000000082167f79dd796f00000000000000000000000000000000000000000000000000000000145b806108de57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061092a57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6000806109d46109cc7fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af888c8c8c8c60405161096c929190613589565b60405180910390208b805190602001206040516020016109b1959493929190948552602085019390935260ff9190911660408401526060830152608082015260a00190565b604051602081830303815290604052805190602001206118aa565b868686611913565b9050610a1a8a828b8b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508d9250611931915050565b9a9950505050505050505050565b333014610a96576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e6365000000000000000060448201526064015b60405180910390fd5b610aad565b80610aa66002611ae5565b03610a9b57505b610ab681611ba2565b50565b606060008054610ac890613599565b80601f0160208091040260200160405190810160405280929190818152602001828054610af490613599565b8015610b415780601f10610b1657610100808354040283529160200191610b41565b820191906000526020600020905b815481529060010190602001808311610b2457829003601f168201915b5050505050905090565b600080610b5a86868686611636565b90506000610b6782610d75565b90506004816007811115610b7d57610b7d61317f565b1480610b9a57506005816007811115610b9857610b9861317f565b145b610c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b60008281526001602081815260409283902060020180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690921790915590518381527f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f910160405180910390a1610ca28288888888611d38565b610caf8288888888611ddf565b610cbc8288888888611d38565b5095945050505050565b600081815260016020908152604080832081519283019091525467ffffffffffffffff16908190525b67ffffffffffffffff1692915050565b604080517f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f602082015290810186905260ff851660608201526000908190610d4d906109cc906080016109b1565b9050610d6a87828860405180602001604052806000815250611ee2565b979650505050505050565b6000818152600160205260408120600281015460ff1615610d995750600792915050565b6002810154610100900460ff1615610db45750600292915050565b6000610dbf84610cc6565b905080600003610e2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f476f7665726e6f723a20756e6b6e6f776e2070726f706f73616c2069640000006044820152606401610a8d565b438110610e3c575060009392505050565b6000610e47856114e8565b9050438110610e5b57506001949350505050565b610e6485611f0e565b8015610e83575060008581526004602052604090208054600190910154115b15610e9357506004949350505050565b506003949350505050565b600080339050610ebf84828560405180602001604052806000815250611ee2565b949350505050565b600080339050610d6a87828888888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a9250611931915050565b600654600090808203610f28575050600554919050565b60006006610f3760018461361b565b81548110610f4757610f4761362e565b60009182526020918290206040805180820190915291015463ffffffff81168083526401000000009091047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169282019290925291508410610fc857602001517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b610ebf600685611f45565b60008033905061101b86828787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611ee292505050565b9695505050505050565b600061102f6114ca565b61103e3361073c60014361361b565b10156110cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f476f7665726e6f723a2070726f706f73657220766f7465732062656c6f77207060448201527f726f706f73616c207468726573686f6c640000000000000000000000000000006064820152608401610a8d565b60006110e18686868680519060200120611636565b90508451865114611174576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b8351865114611205576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b6000865111611270576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a20656d7074792070726f706f73616c00000000000000006044820152606401610a8d565b6000818152600160209081526040918290208251918201909252815467ffffffffffffffff169081905215611327576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c20616c726561647920657869737460448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b600061133a61133560085490565b61203c565b6113434361203c565b61134d919061365d565b9050600061135d61133560095490565b611367908361365d565b83547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff841617845590506001830180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff83161790557f7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e084338b8b8d5167ffffffffffffffff81111561141057611410612c4f565b60405190808252806020026020018201604052801561144357816020015b606081526020019060019003908161142e5790505b508c88888e60405161145d9998979695949392919061375b565b60405180910390a15091979650505050505050565b600061147f8484846120d6565b90505b9392505050565b600654600090156114c15761149e60066117b7565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16905090565b6005545b905090565b6000600a54600a6114db9190613998565b6007546114c591906139a4565b600081815260016020818152604080842081519283019091529091015467ffffffffffffffff1690819052610cef565b333014611581576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610a8d565b611598565b806115916002611ae5565b0361158657505b6000808573ffffffffffffffffffffffffffffffffffffffff168585856040516115c3929190613589565b60006040518083038185875af1925050503d8060008114611600576040519150601f19603f3d011682016040523d82523d6000602084013e611605565b606091505b509150915061162d8282604051806060016040528060288152602001613b3060289139612192565b50505050505050565b60008484848460405160200161164f94939291906139bb565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012095945050505050565b600061148283836116aa60408051602081019091526000815290565b6120d6565b600061092a826121ab565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff821115611768576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203260448201527f32342062697473000000000000000000000000000000000000000000000000006064820152608401610a8d565b5090565b60008061178a8461177c43611814565b611785866116ba565b61227b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff91821693501690505b9250929050565b8054600090801561180b576117df836117d160018461361b565b600091825260209091200190565b5464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16611482565b60009392505050565b600063ffffffff821115611768576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201527f32206269747300000000000000000000000000000000000000000000000000006064820152608401610a8d565b600061092a6118b7612490565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611924878787876125c4565b91509150610cbc816126b3565b600085815260016020819052604082209061194b88610d75565b600781111561195c5761195c61317f565b146119e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f476f7665726e6f723a20766f7465206e6f742063757272656e746c792061637460448201527f69766500000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b6040805160208101909152815467ffffffffffffffff1690819052600090611a13908890866120d6565b9050611a228888888488612866565b8351600003611a84578673ffffffffffffffffffffffffffffffffffffffff167fb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda489888489604051611a779493929190613a06565b60405180910390a2610d6a565b8673ffffffffffffffffffffffffffffffffffffffff167fe2babfbac5889a709b63bb7f598b324e08bc5a4fb9ec647fb3cbc9ec07eb87128988848989604051611ad2959493929190613a2e565b60405180910390a2979650505050505050565b6000611b0d8254600f81810b700100000000000000000000000000000000909204900b131590565b15611b44576040517f3db2a12a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b508054600f0b6000818152600180840160205260408220805492905583547fffffffffffffffffffffffffffffffff000000000000000000000000000000001692016fffffffffffffffffffffffffffffffff169190911790915590565b6064811115611c59576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604360248201527f476f7665726e6f72566f74657351756f72756d4672616374696f6e3a2071756f60448201527f72756d4e756d657261746f72206f7665722071756f72756d44656e6f6d696e6160648201527f746f720000000000000000000000000000000000000000000000000000000000608482015260a401610a8d565b6000611c63611489565b90508015801590611c745750600654155b15611cee57604080518082019091526000815260069060208101611c97846116ba565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff90811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b611cf960068361176c565b505060408051828152602081018490527f0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997910160405180910390a15050565b611dd8565b8451811015611dd6573073ffffffffffffffffffffffffffffffffffffffff16858281518110611d6f57611d6f61362e565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603611dc657611dc6838281518110611da757611da761362e565b6020026020010151805190602001206002612aa690919063ffffffff16565b611dcf81613a74565b9050611d3d565b505b5050505050565b6000604051806060016040528060278152602001613b5860279139905060005b855181101561162d57600080878381518110611e1d57611e1d61362e565b602002602001015173ffffffffffffffffffffffffffffffffffffffff16878481518110611e4d57611e4d61362e565b6020026020010151878581518110611e6757611e6761362e565b6020026020010151604051611e7c9190613aac565b60006040518083038185875af1925050503d8060008114611eb9576040519150601f19603f3d011682016040523d82523d6000602084013e611ebe565b606091505b5091509150611ece828286612192565b50505080611edb90613a74565b9050611dff565b6000611f0585858585611f0060408051602081019091526000815290565b611931565b95945050505050565b600081815260046020526040812060028101546001820154611f309190613ac8565b611f3c6107a185610cc6565b11159392505050565b6000438210611fb0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e65646044820152606401610a8d565b6000611fbb83611814565b84549091506000611fce86848385612af8565b9050801561201157611fe5866117d160018461361b565b5464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16612014565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169695505050505050565b600067ffffffffffffffff821115611768576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203660448201527f34206269747300000000000000000000000000000000000000000000000000006064820152608401610a8d565b6040517f3a46b1a800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152602482018490526000917f000000000000000000000000000000000000000000000000000000000000000090911690633a46b1a890604401602060405180830381865afa15801561216e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061147f9190613adb565b606083156121a1575081611482565b6114828383612b56565b600060646121b883610f11565b6040517f8e539e8c000000000000000000000000000000000000000000000000000000008152600481018590527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690638e539e8c90602401602060405180830381865afa158015612243573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122679190613adb565b61227191906139a4565b61092a9190613af4565b82546000908190801561241d576000612299876117d160018561361b565b60408051808201909152905463ffffffff8082168084526401000000009092047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166020840152919250908716101561234a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f436865636b706f696e743a20696e76616c6964206b65790000000000000000006044820152606401610a8d565b805163ffffffff8088169116036123a8578461236b886117d160018661361b565b80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092166401000000000263ffffffff90921691909117905561240d565b6040805180820190915263ffffffff80881682527bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80881660208085019182528b54600181018d5560008d81529190912094519151909216640100000000029216919091179101555b6020015192508391506124889050565b50506040805180820190915263ffffffff80851682527bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80851660208085019182528854600181018a5560008a8152918220955192519093166401000000000291909316179201919091559050815b935093915050565b60003073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161480156124f657507f000000000000000000000000000000000000000000000000000000000000000046145b1561252057507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156125fb57506000905060036126aa565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561264f573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166126a3576000600192509250506126aa565b9150600090505b94509492505050565b60008160048111156126c7576126c761317f565b036126cf5750565b60018160048111156126e3576126e361317f565b0361274a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610a8d565b600281600481111561275e5761275e61317f565b036127c5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610a8d565b60038160048111156127d9576127d961317f565b03610ab6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610a8d565b600085815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452600381019092529091205460ff161561292b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f476f7665726e6f72566f74696e6753696d706c653a20766f746520616c72656160448201527f64792063617374000000000000000000000000000000000000000000000000006064820152608401610a8d565b73ffffffffffffffffffffffffffffffffffffffff85166000908152600382016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905560ff84166129a257828160000160008282546129979190613ac8565b90915550611dd69050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60ff8516016129e057828160010160008282546129979190613ac8565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe60ff851601612a1e57828160020160008282546129979190613ac8565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f476f7665726e6f72566f74696e6753696d706c653a20696e76616c696420766160448201527f6c756520666f7220656e756d20566f74655479706500000000000000000000006064820152608401610a8d565b815470010000000000000000000000000000000090819004600f0b6000818152600180860160205260409091209390935583546fffffffffffffffffffffffffffffffff908116939091011602179055565b60005b81831015612b4e576000612b0f8484612b9a565b60008781526020902090915063ffffffff86169082015463ffffffff161115612b3a57809250612b48565b612b45816001613ac8565b93505b50612afb565b509392505050565b815115612b665781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8d9190612e91565b6000612ba96002848418613af4565b61148290848416613ac8565b600060208284031215612bc757600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461148257600080fd5b803560ff81168114612c0857600080fd5b919050565b60008083601f840112612c1f57600080fd5b50813567ffffffffffffffff811115612c3757600080fd5b6020830191508360208285010111156117b057600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612cc557612cc5612c4f565b604052919050565b600067ffffffffffffffff831115612ce757612ce7612c4f565b612d1860207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f86011601612c7e565b9050828152838383011115612d2c57600080fd5b828260208301376000602084830101529392505050565b600082601f830112612d5457600080fd5b61148283833560208501612ccd565b60008060008060008060008060e0898b031215612d7f57600080fd5b88359750612d8f60208a01612bf7565b9650604089013567ffffffffffffffff80821115612dac57600080fd5b612db88c838d01612c0d565b909850965060608b0135915080821115612dd157600080fd5b50612dde8b828c01612d43565b945050612ded60808a01612bf7565b925060a0890135915060c089013590509295985092959890939650565b600060208284031215612e1c57600080fd5b5035919050565b60005b83811015612e3e578181015183820152602001612e26565b50506000910152565b60008151808452612e5f816020860160208601612e23565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006114826020830184612e47565b803573ffffffffffffffffffffffffffffffffffffffff81168114612c0857600080fd5b60008060008060808587031215612ede57600080fd5b612ee785612ea4565b9350612ef560208601612ea4565b925060408501359150606085013567ffffffffffffffff811115612f1857600080fd5b612f2487828801612d43565b91505092959194509250565b600067ffffffffffffffff821115612f4a57612f4a612c4f565b5060051b60200190565b600082601f830112612f6557600080fd5b81356020612f7a612f7583612f30565b612c7e565b82815260059290921b84018101918181019086841115612f9957600080fd5b8286015b84811015612fbb57612fae81612ea4565b8352918301918301612f9d565b509695505050505050565b600082601f830112612fd757600080fd5b81356020612fe7612f7583612f30565b82815260059290921b8401810191818101908684111561300657600080fd5b8286015b84811015612fbb578035835291830191830161300a565b600082601f83011261303257600080fd5b81356020613042612f7583612f30565b82815260059290921b8401810191818101908684111561306157600080fd5b8286015b84811015612fbb57803567ffffffffffffffff8111156130855760008081fd5b6130938986838b0101612d43565b845250918301918301613065565b600080600080608085870312156130b757600080fd5b843567ffffffffffffffff808211156130cf57600080fd5b6130db88838901612f54565b955060208701359150808211156130f157600080fd5b6130fd88838901612fc6565b9450604087013591508082111561311357600080fd5b5061312087828801613021565b949793965093946060013593505050565b600080600080600060a0868803121561314957600080fd5b8535945061315960208701612bf7565b935061316760408701612bf7565b94979396509394606081013594506080013592915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60208101600883106131e9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b6000806040838503121561320257600080fd5b8235915061321260208401612ea4565b90509250929050565b6000806040838503121561322e57600080fd5b8235915061321260208401612bf7565b60008060008060006080868803121561325657600080fd5b8535945061326660208701612bf7565b9350604086013567ffffffffffffffff8082111561328357600080fd5b61328f89838a01612c0d565b909550935060608801359150808211156132a857600080fd5b506132b588828901612d43565b9150509295509295909350565b600080600080606085870312156132d857600080fd5b843593506132e860208601612bf7565b9250604085013567ffffffffffffffff81111561330457600080fd5b61331087828801612c0d565b95989497509550505050565b6000806000806080858703121561333257600080fd5b843567ffffffffffffffff8082111561334a57600080fd5b61335688838901612f54565b9550602087013591508082111561336c57600080fd5b61337888838901612fc6565b9450604087013591508082111561338e57600080fd5b61339a88838901613021565b935060608701359150808211156133b057600080fd5b508501601f810187136133c257600080fd5b612f2487823560208401612ccd565b6000806000606084860312156133e657600080fd5b6133ef84612ea4565b925060208401359150604084013567ffffffffffffffff81111561341257600080fd5b61341e86828701612d43565b9150509250925092565b600080600080600060a0868803121561344057600080fd5b61344986612ea4565b945061345760208701612ea4565b9350604086013567ffffffffffffffff8082111561347457600080fd5b61348089838a01612fc6565b9450606088013591508082111561349657600080fd5b6134a289838a01612fc6565b935060808801359150808211156132a857600080fd5b600080600080606085870312156134ce57600080fd5b6134d785612ea4565b935060208501359250604085013567ffffffffffffffff81111561330457600080fd5b6000806040838503121561350d57600080fd5b61351683612ea4565b946020939093013593505050565b600080600080600060a0868803121561353c57600080fd5b61354586612ea4565b945061355360208701612ea4565b93506040860135925060608601359150608086013567ffffffffffffffff81111561357d57600080fd5b6132b588828901612d43565b8183823760009101908152919050565b600181811c908216806135ad57607f821691505b6020821081036135e6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111561092a5761092a6135ec565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b67ffffffffffffffff81811683821601908082111561367e5761367e6135ec565b5092915050565b600081518084526020808501945080840160005b838110156136cb57815173ffffffffffffffffffffffffffffffffffffffff1687529582019590820190600101613699565b509495945050505050565b600081518084526020808501945080840160005b838110156136cb578151875295820195908201906001016136ea565b600081518084526020808501808196508360051b8101915082860160005b8581101561374e57828403895261373c848351612e47565b98850198935090840190600101613724565b5091979650505050505050565b60006101208b8352602073ffffffffffffffffffffffffffffffffffffffff8c16818501528160408501526137928285018c613685565b915083820360608501526137a6828b6136d6565b915083820360808501528189518084528284019150828160051b850101838c0160005b83811015613815577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0878403018552613803838351612e47565b948601949250908501906001016137c9565b505086810360a0880152613829818c613706565b94505050505061384560c084018767ffffffffffffffff169052565b67ffffffffffffffff851660e08401528281036101008401526138688185612e47565b9c9b505050505050505050505050565b600181815b808511156138d157817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211156138b7576138b76135ec565b808516156138c457918102915b93841c939080029061387d565b509250929050565b6000826138e85750600161092a565b816138f55750600061092a565b816001811461390b576002811461391557613931565b600191505061092a565b60ff841115613926576139266135ec565b50506001821b61092a565b5060208310610133831016604e8410600b8410161715613954575081810a61092a565b61395e8383613878565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115613990576139906135ec565b029392505050565b600061148283836138d9565b808202811582820484141761092a5761092a6135ec565b6080815260006139ce6080830187613685565b82810360208401526139e081876136d6565b905082810360408401526139f48186613706565b91505082606083015295945050505050565b84815260ff8416602082015282604082015260806060820152600061101b6080830184612e47565b85815260ff8516602082015283604082015260a060608201526000613a5660a0830185612e47565b8281036080840152613a688185612e47565b98975050505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203613aa557613aa56135ec565b5060010190565b60008251613abe818460208701612e23565b9190910192915050565b8082018082111561092a5761092a6135ec565b600060208284031215613aed57600080fd5b5051919050565b600082613b2a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fe476f7665726e6f723a2072656c617920726576657274656420776974686f7574206d657373616765476f7665726e6f723a2063616c6c20726576657274656420776974686f7574206d657373616765a2646970667358221220acc2fc99b2383011bb13e88f84a30f87226eb9b16f5b2b622287d67903250ca764736f6c63430008110033",
  },
  GovernorQuorumFractionTimelock: {
    abi: [
      {
        inputs: [
          {
            internalType: "contract IVotes",
            name: "_token",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_votingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_votingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_proposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_quorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_tokenDecimals",
            type: "uint256",
          },
          {
            internalType: "contract TimelockController",
            name: "_timelock",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "Empty",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalCanceled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            indexed: false,
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          {
            indexed: false,
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "ProposalCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "eta",
            type: "uint256",
          },
        ],
        name: "ProposalQueued",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldQuorumNumerator",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newQuorumNumerator",
            type: "uint256",
          },
        ],
        name: "QuorumNumeratorUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "oldTimelock",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "newTimelock",
            type: "address",
          },
        ],
        name: "TimelockChange",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "VoteCast",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "VoteCastWithParams",
        type: "event",
      },
      {
        inputs: [],
        name: "BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "COUNTING_MODE",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "EXTENDED_BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
        ],
        name: "castVote",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "castVoteWithReason",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "castVoteWithReasonAndParams",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteWithReasonAndParamsBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "execute",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "getVotes",
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
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "getVotesWithParams",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasVoted",
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
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "hashProposal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalDeadline",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalEta",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalSnapshot",
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
        inputs: [],
        name: "proposalThreshold",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalVotes",
        outputs: [
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "forVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "abstainVotes",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "propose",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "queue",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorum",
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
        inputs: [],
        name: "quorumDenominator",
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
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorumNumerator",
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
        inputs: [],
        name: "quorumNumerator",
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
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "relay",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "state",
        outputs: [
          {
            internalType: "enum IGovernor.ProposalState",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
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
        name: "timelock",
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
      {
        inputs: [],
        name: "token",
        outputs: [
          {
            internalType: "contract IVotes",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newQuorumNumerator",
            type: "uint256",
          },
        ],
        name: "updateQuorumNumerator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract TimelockController",
            name: "newTimelock",
            type: "address",
          },
        ],
        name: "updateTimelock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "votingDelay",
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
        inputs: [],
        name: "votingPeriod",
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
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x6101606040523480156200001257600080fd5b5060405162004fbc38038062004fbc8339810160408190526200003591620006c2565b8083898980620000596040805180820190915260018152603160f81b602082015290565b815160209283012081519183019190912060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818801819052818301969096526060810194909452608080850193909352308483018190528151808603909301835260c094850190915281519190950120905291909152610120526000620000f682826200087f565b50506001600160a01b03166101405262000110816200013a565b506200011c81620002b6565b505060099290925550600a92909255600b55600c5550620009739050565b6064811115620001c35760405162461bcd60e51b815260206004820152604360248201527f476f7665726e6f72566f74657351756f72756d4672616374696f6e3a2071756f60448201527f72756d4e756d657261746f72206f7665722071756f72756d44656e6f6d696e616064820152623a37b960e91b608482015260a4015b60405180910390fd5b6000620001cf6200031f565b90508015801590620001e15750600654155b156200025c5760066000016040518060400160405280600063ffffffff1681526020016200021a846200035760201b620016fc1760201c565b6001600160e01b0390811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b62000277826006620003c660201b620017ae1790919060201c565b505060408051828152602081018490527f0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997910160405180910390a15050565b600754604080516001600160a01b03928316815291831660208301527f08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401910160405180910390a1600780546001600160a01b0319166001600160a01b0392909216919091179055565b6006546000901562000350576200034260066200041960201b620017f91760201c565b6001600160e01b0316905090565b5060055490565b60006001600160e01b03821115620003c25760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b6064820152608401620001ba565b5090565b6000806200040384600001620003e7436200046760201b6200184d1760201c565b620003fd866200035760201b620016fc1760201c565b620004ce565b6001600160e01b03918216969116945092505050565b805460009080156200045d576200044583620004376001846200094b565b600091825260209091200190565b5464010000000090046001600160e01b031662000460565b60005b9392505050565b600063ffffffff821115620003c25760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b6064820152608401620001ba565b82546000908190801562000623576000620004f087620004376001856200094b565b60408051808201909152905463ffffffff8082168084526401000000009092046001600160e01b031660208401529192509087161015620005745760405162461bcd60e51b815260206004820152601760248201527f436865636b706f696e743a20696e76616c6964206b65790000000000000000006044820152606401620001ba565b805163ffffffff808816911603620005c257846200059988620004376001866200094b565b80546001600160e01b03929092166401000000000263ffffffff90921691909117905562000612565b6040805180820190915263ffffffff80881682526001600160e01b0380881660208085019182528b54600181018d5560008d81529190912094519151909216640100000000029216919091179101555b602001519250839150620006799050565b50506040805180820190915263ffffffff80851682526001600160e01b0380851660208085019182528854600181018a5560008a8152918220955192519093166401000000000291909316179201919091559050815b935093915050565b6001600160a01b03811681146200069757600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b8051620006bd8162000681565b919050565b600080600080600080600080610100898b031215620006e057600080fd5b8851620006ed8162000681565b60208a810151919950906001600160401b03808211156200070d57600080fd5b818c0191508c601f8301126200072257600080fd5b8151818111156200073757620007376200069a565b604051601f8201601f19908116603f011681019083821181831017156200076257620007626200069a565b816040528281528f868487010111156200077b57600080fd5b600093505b828410156200079f578484018601518185018701529285019262000780565b6000868483010152809c5050505050505060408901519550606089015194506080890151935060a0890151925060c08901519150620007e160e08a01620006b0565b90509295985092959890939650565b600181811c908216806200080557607f821691505b6020821081036200082657634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200087a57600081815260208120601f850160051c81016020861015620008555750805b601f850160051c820191505b81811015620008765782815560010162000861565b5050505b505050565b81516001600160401b038111156200089b576200089b6200069a565b620008b381620008ac8454620007f0565b846200082c565b602080601f831160018114620008eb5760008415620008d25750858301515b600019600386901b1c1916600185901b17855562000876565b600085815260208120601f198616915b828110156200091c57888601518255948401946001909101908401620008fb565b50858210156200093b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b818103818111156200096d57634e487b7160e01b600052601160045260246000fd5b92915050565b60805160a05160c05160e0516101005161012051610140516145e0620009dc600039600081816108f70152818161263c015261279901526000612c0801526000612c5701526000612c3201526000612b8b01526000612bb501526000612bdf01526145e06000f3fe6080604052600436106102895760003560e01c80637b3c71d311610153578063c01f9e37116100cb578063deaaa7cc1161007f578063f23a6e6111610064578063f23a6e6114610880578063f8ce560a146108c5578063fc0c546a146108e557600080fd5b8063deaaa7cc1461082c578063eb9019d41461086057600080fd5b8063c59057e4116100b0578063c59057e41461077a578063d33219b41461079a578063dd4e2ba5146107e657600080fd5b8063c01f9e3714610747578063c28bc2fa1461076757600080fd5b8063a7713a7011610122578063ab58fb8e11610107578063ab58fb8e146106cd578063b58131b0146106ed578063bc197c811461070257600080fd5b8063a7713a7014610698578063a890c910146106ad57600080fd5b80637b3c71d3146106245780637d5e81e21461064457806397c3d334146106645780639a802a6d1461067857600080fd5b80632fe3e26111610201578063544ffc9c116101b5578063567813881161019a57806356781388146105c45780635f398a14146105e457806360c4247f1461060457600080fd5b8063544ffc9c1461052957806354fd4d501461057e57600080fd5b80633bccf4fd116101e65780633bccf4fd146104855780633e4f49e6146104a557806343859632146104d257600080fd5b80632fe3e2611461043c5780633932abb11461047057600080fd5b806306fdde0311610258578063160cbed71161023d578063160cbed7146103e95780632656227d146104095780632d63f6931461041c57600080fd5b806306fdde0314610352578063150b7a021461037457600080fd5b806301ffc9a7146102be57806302a251a3146102f3578063034201811461031257806306f3f9e61461033257600080fd5b366102b95730610297610919565b73ffffffffffffffffffffffffffffffffffffffff16146102b757600080fd5b005b600080fd5b3480156102ca57600080fd5b506102de6102d936600461352a565b61093f565b60405190151581526020015b60405180910390f35b3480156102ff57600080fd5b50600b545b6040519081526020016102ea565b34801561031e57600080fd5b5061030461032d3660046136d8565b610950565b34801561033e57600080fd5b506102b761034d36600461377f565b610a48565b34801561035e57600080fd5b50610367610b48565b6040516102ea91906137fc565b34801561038057600080fd5b506103b861038f366004613831565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016102ea565b3480156103f557600080fd5b50610304610404366004613a10565b610bda565b610304610417366004613a10565b610ebc565b34801561042857600080fd5b5061030461043736600461377f565b611037565b34801561044857600080fd5b506103047fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af8881565b34801561047c57600080fd5b50600a54610304565b34801561049157600080fd5b506103046104a0366004613aa0565b611070565b3480156104b157600080fd5b506104c56104c036600461377f565b6110e6565b6040516102ea9190613b1d565b3480156104de57600080fd5b506102de6104ed366004613b5e565b600082815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845260030190915290205460ff1692915050565b34801561053557600080fd5b5061056361054436600461377f565b6000908152600460205260409020805460018201546002909201549092565b604080519384526020840192909252908201526060016102ea565b34801561058a57600080fd5b5060408051808201909152600181527f31000000000000000000000000000000000000000000000000000000000000006020820152610367565b3480156105d057600080fd5b506103046105df366004613b8e565b6110f1565b3480156105f057600080fd5b506103046105ff366004613bba565b61111a565b34801561061057600080fd5b5061030461061f36600461377f565b611164565b34801561063057600080fd5b5061030461063f366004613c3e565b611226565b34801561065057600080fd5b5061030461065f366004613c98565b611278565b34801561067057600080fd5b506064610304565b34801561068457600080fd5b50610304610693366004613d4d565b61128f565b3480156106a457600080fd5b506103046112a6565b3480156106b957600080fd5b506102b76106c8366004613da6565b6112e5565b3480156106d957600080fd5b506103046106e836600461377f565b6113dd565b3480156106f957600080fd5b5061030461149d565b34801561070e57600080fd5b506103b861071d366004613dc3565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b34801561075357600080fd5b5061030461076236600461377f565b6114bb565b6102b7610775366004613e57565b6114eb565b34801561078657600080fd5b50610304610795366004613a10565b611678565b3480156107a657600080fd5b5060075473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102ea565b3480156107f257600080fd5b506040805180820190915260208082527f737570706f72743d627261766f2671756f72756d3d666f722c6162737461696e90820152610367565b34801561083857600080fd5b506103047f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f81565b34801561086c57600080fd5b5061030461087b366004613e9b565b6116d0565b34801561088c57600080fd5b506103b861089b366004613ec7565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b3480156108d157600080fd5b506103046108e036600461377f565b6116f1565b3480156108f157600080fd5b506107c17f000000000000000000000000000000000000000000000000000000000000000081565b600061093a60075473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b600061094a826118e3565b92915050565b6000806109f46109ec7fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af888c8c8c8c60405161098c929190613f30565b60405180910390208b805190602001206040516020016109d1959493929190948552602085019390935260ff9190911660408401526060830152608082015260a00190565b60405160208183030381529060405280519060200120611939565b8686866119a2565b9050610a3a8a828b8b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508d92506119c0915050565b9a9950505050505050505050565b610a50610919565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ae9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e6365000000000000000060448201526064015b60405180910390fd5b30610af2610919565b73ffffffffffffffffffffffffffffffffffffffff1614610b3c5760008036604051610b1f929190613f30565b604051809103902090505b80610b356002611b74565b03610b2a57505b610b4581611c31565b50565b606060008054610b5790613f40565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8390613f40565b8015610bd05780601f10610ba557610100808354040283529160200191610bd0565b820191906000526020600020905b815481529060010190602001808311610bb357829003601f168201915b5050505050905090565b600080610be986868686611678565b90506004610bf6826110e6565b6007811115610c0757610c07613aee565b14610c94576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b600754604080517ff27a0c92000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163f27a0c929160048083019260209291908290030181865afa158015610d04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d289190613f93565b6007546040517fb1c5f42700000000000000000000000000000000000000000000000000000000815291925073ffffffffffffffffffffffffffffffffffffffff169063b1c5f42790610d88908a908a908a906000908b90600401614082565b602060405180830381865afa158015610da5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc99190613f93565b6000838152600860205260408082209290925560075491517f8f2a0bb000000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90921691638f2a0bb091610e3a918b918b918b91908b9089906004016140d0565b600060405180830381600087803b158015610e5457600080fd5b505af1158015610e68573d6000803e3d6000fd5b505050507f9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892828242610e9a9190614157565b6040805192835260208301919091520160405180910390a15095945050505050565b600080610ecb86868686611678565b90506000610ed8826110e6565b90506004816007811115610eee57610eee613aee565b1480610f0b57506005816007811115610f0957610f09613aee565b145b610f97576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b60008281526001602081815260409283902060020180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690921790915590518381527f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f910160405180910390a16110138288888888611dc7565b6110208288888888611e90565b61102d8288888888611e9d565b5095945050505050565b600081815260016020908152604080832081519283019091525467ffffffffffffffff16908190525b67ffffffffffffffff1692915050565b604080517f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f602082015290810186905260ff8516606082015260009081906110be906109ec906080016109d1565b90506110db87828860405180602001604052806000815250611ef0565b979650505050505050565b600061094a82611f13565b60008033905061111284828560405180602001604052806000815250611ef0565b949350505050565b6000803390506110db87828888888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a92506119c0915050565b60065460009080820361117b575050600554919050565b6000600661118a60018461416a565b8154811061119a5761119a61417d565b60009182526020918290206040805180820190915291015463ffffffff81168083526401000000009091047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16928201929092529150841061121b57602001517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b6111126006856120a9565b60008033905061126e86828787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611ef092505050565b9695505050505050565b6000611286858585856121a0565b95945050505050565b600061129c8484846125ed565b90505b9392505050565b600654600090156112de576112bb60066117f9565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16905090565b5060055490565b6112ed610919565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611381576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610ae0565b3061138a610919565b73ffffffffffffffffffffffffffffffffffffffff16146113d457600080366040516113b7929190613f30565b604051809103902090505b806113cd6002611b74565b036113c257505b610b45816126a9565b6007546000828152600860205260408082205490517fd45c443500000000000000000000000000000000000000000000000000000000815260048101919091529091829173ffffffffffffffffffffffffffffffffffffffff9091169063d45c443590602401602060405180830381865afa158015611460573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114849190613f93565b905080600114611494578061129f565b60009392505050565b6000600c54600a6114ae91906142cc565b60095461093a91906142d8565b600081815260016020818152604080842081519283019091529091015467ffffffffffffffff1690819052611060565b6114f3610919565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611587576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610ae0565b30611590610919565b73ffffffffffffffffffffffffffffffffffffffff16146115da57600080366040516115bd929190613f30565b604051809103902090505b806115d36002611b74565b036115c857505b6000808573ffffffffffffffffffffffffffffffffffffffff16858585604051611605929190613f30565b60006040518083038185875af1925050503d8060008114611642576040519150601f19603f3d011682016040523d82523d6000602084013e611647565b606091505b509150915061166f828260405180606001604052806028815260200161458360289139612744565b50505050505050565b60008484848460405160200161169194939291906142ef565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012095945050505050565b600061129f83836116ec60408051602081019091526000815290565b6125ed565b600061094a8261275d565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8211156117aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203260448201527f32342062697473000000000000000000000000000000000000000000000000006064820152608401610ae0565b5090565b6000806117cc846117be4361184d565b6117c7866116fc565b61282d565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff91821693501690505b9250929050565b80546000908015611494576118218361181360018461416a565b600091825260209091200190565b5464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1661129f565b600063ffffffff8211156117aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201527f32206269747300000000000000000000000000000000000000000000000000006064820152608401610ae0565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f6e665ced00000000000000000000000000000000000000000000000000000000148061094a575061094a82612a42565b600061094a611946612b71565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006119b387878787612ca5565b9150915061102d81612d94565b60008581526001602081905260408220906119da886110e6565b60078111156119eb576119eb613aee565b14611a78576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f476f7665726e6f723a20766f7465206e6f742063757272656e746c792061637460448201527f69766500000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b6040805160208101909152815467ffffffffffffffff1690819052600090611aa2908890866125ed565b9050611ab18888888488612f47565b8351600003611b13578673ffffffffffffffffffffffffffffffffffffffff167fb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda489888489604051611b06949392919061433a565b60405180910390a26110db565b8673ffffffffffffffffffffffffffffffffffffffff167fe2babfbac5889a709b63bb7f598b324e08bc5a4fb9ec647fb3cbc9ec07eb87128988848989604051611b61959493929190614362565b60405180910390a2979650505050505050565b6000611b9c8254600f81810b700100000000000000000000000000000000909204900b131590565b15611bd3576040517f3db2a12a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b508054600f0b6000818152600180840160205260408220805492905583547fffffffffffffffffffffffffffffffff000000000000000000000000000000001692016fffffffffffffffffffffffffffffffff169190911790915590565b6064811115611ce8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604360248201527f476f7665726e6f72566f74657351756f72756d4672616374696f6e3a2071756f60448201527f72756d4e756d657261746f72206f7665722071756f72756d44656e6f6d696e6160648201527f746f720000000000000000000000000000000000000000000000000000000000608482015260a401610ae0565b6000611cf26112a6565b90508015801590611d035750600654155b15611d7d57604080518082019091526000815260069060208101611d26846116fc565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff90811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b611d886006836117ae565b505060408051828152602081018490527f0553476bf02ef2726e8ce5ced78d63e26e602e4a2257b1f559418e24b4633997910160405180910390a15050565b30611dd0610919565b73ffffffffffffffffffffffffffffffffffffffff1614611e895760005b8451811015611e87573073ffffffffffffffffffffffffffffffffffffffff16858281518110611e2057611e2061417d565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603611e7757611e77838281518110611e5857611e5861417d565b602002602001015180519060200120600261318790919063ffffffff16565b611e80816143a8565b9050611dee565b505b5050505050565b611e8985858585856131d9565b30611ea6610919565b73ffffffffffffffffffffffffffffffffffffffff1614611e8957600254600f81810b700100000000000000000000000000000000909204900b1315611e89576000600255611e89565b600061128685858585611f0e60408051602081019091526000815290565b6119c0565b600080611f1f83613273565b90506004816007811115611f3557611f35613aee565b14611f405792915050565b60008381526008602052604090205480611f5b575092915050565b6007546040517f2ab0f5290000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690632ab0f52990602401602060405180830381865afa158015611fca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fee91906143e0565b15611ffd575060079392505050565b6007546040517f584b153e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff9091169063584b153e90602401602060405180830381865afa15801561206c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209091906143e0565b1561209f575060059392505050565b5060029392505050565b6000438210612114576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e65646044820152606401610ae0565b600061211f8361184d565b845490915060006121328684838561339c565b90508015612175576121498661181360018461416a565b5464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16612178565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169695505050505050565b60006121aa61149d565b6121b93361087b60014361416a565b1015612247576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f476f7665726e6f723a2070726f706f73657220766f7465732062656c6f77207060448201527f726f706f73616c207468726573686f6c640000000000000000000000000000006064820152608401610ae0565b600061225c8686868680519060200120611678565b905084518651146122ef576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b8351865114612380576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b60008651116123eb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a20656d7074792070726f706f73616c00000000000000006044820152606401610ae0565b6000818152600160209081526040918290208251918201909252815467ffffffffffffffff1690819052156124a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c20616c726561647920657869737460448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b60006124b56124b0600a5490565b6133fa565b6124be436133fa565b6124c89190614402565b905060006124d86124b0600b5490565b6124e29083614402565b83547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff841617845590506001830180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff83161790557f7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e084338b8b8d5167ffffffffffffffff81111561258b5761258b6135c4565b6040519080825280602002602001820160405280156125be57816020015b60608152602001906001900390816125a95790505b508c88888e6040516125d89998979695949392919061442a565b60405180910390a15091979650505050505050565b6040517f3a46b1a800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152602482018490526000917f000000000000000000000000000000000000000000000000000000000000000090911690633a46b1a890604401602060405180830381865afa158015612685573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061129c9190613f93565b6007546040805173ffffffffffffffffffffffffffffffffffffffff928316815291831660208301527f08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401910160405180910390a1600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6060831561275357508161129f565b61129f8383613494565b6000606461276a83611164565b6040517f8e539e8c000000000000000000000000000000000000000000000000000000008152600481018590527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690638e539e8c90602401602060405180830381865afa1580156127f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128199190613f93565b61282391906142d8565b61094a9190614547565b8254600090819080156129cf57600061284b8761181360018561416a565b60408051808201909152905463ffffffff8082168084526401000000009092047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16602084015291925090871610156128fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f436865636b706f696e743a20696e76616c6964206b65790000000000000000006044820152606401610ae0565b805163ffffffff80881691160361295a578461291d8861181360018661416a565b80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092166401000000000263ffffffff9092169190911790556129bf565b6040805180820190915263ffffffff80881682527bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80881660208085019182528b54600181018d5560008d81529190912094519151909216640100000000029216919091179101555b602001519250839150612a3a9050565b50506040805180820190915263ffffffff80851682527bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80851660208085019182528854600181018a5560008a8152918220955192519093166401000000000291909316179201919091559050815b935093915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fbf26d897000000000000000000000000000000000000000000000000000000001480612ad557507fffffffff0000000000000000000000000000000000000000000000000000000082167f79dd796f00000000000000000000000000000000000000000000000000000000145b80612b2157507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061094a57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083161461094a565b60003073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016148015612bd757507f000000000000000000000000000000000000000000000000000000000000000046145b15612c0157507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612cdc5750600090506003612d8b565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612d30573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116612d8457600060019250925050612d8b565b9150600090505b94509492505050565b6000816004811115612da857612da8613aee565b03612db05750565b6001816004811115612dc457612dc4613aee565b03612e2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610ae0565b6002816004811115612e3f57612e3f613aee565b03612ea6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610ae0565b6003816004811115612eba57612eba613aee565b03610b45576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610ae0565b600085815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452600381019092529091205460ff161561300c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f476f7665726e6f72566f74696e6753696d706c653a20766f746520616c72656160448201527f64792063617374000000000000000000000000000000000000000000000000006064820152608401610ae0565b73ffffffffffffffffffffffffffffffffffffffff85166000908152600382016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905560ff841661308357828160000160008282546130789190614157565b90915550611e879050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60ff8516016130c157828160010160008282546130789190614157565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe60ff8516016130ff57828160020160008282546130789190614157565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f476f7665726e6f72566f74696e6753696d706c653a20696e76616c696420766160448201527f6c756520666f7220656e756d20566f74655479706500000000000000000000006064820152608401610ae0565b815470010000000000000000000000000000000090819004600f0b6000818152600180860160205260409091209390935583546fffffffffffffffffffffffffffffffff908116939091011602179055565b6007546040517fe38335e500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063e38335e590349061323a908890889088906000908990600401614082565b6000604051808303818588803b15801561325357600080fd5b505af1158015613267573d6000803e3d6000fd5b50505050505050505050565b6000818152600160205260408120600281015460ff16156132975750600792915050565b6002810154610100900460ff16156132b25750600292915050565b60006132bd84611037565b905080600003613329576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f476f7665726e6f723a20756e6b6e6f776e2070726f706f73616c2069640000006044820152606401610ae0565b43811061333a575060009392505050565b6000613345856114bb565b905043811061335957506001949350505050565b613362856134d8565b8015613381575060008581526004602052604090208054600190910154115b1561339157506004949350505050565b506003949350505050565b60005b818310156133f25760006133b3848461350f565b60008781526020902090915063ffffffff86169082015463ffffffff1611156133de578092506133ec565b6133e9816001614157565b93505b5061339f565b509392505050565b600067ffffffffffffffff8211156117aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203660448201527f34206269747300000000000000000000000000000000000000000000000000006064820152608401610ae0565b8151156134a45781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae091906137fc565b6000818152600460205260408120600281015460018201546134fa9190614157565b6135066108e085611037565b11159392505050565b600061351e6002848418614547565b61129f90848416614157565b60006020828403121561353c57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461129f57600080fd5b803560ff8116811461357d57600080fd5b919050565b60008083601f84011261359457600080fd5b50813567ffffffffffffffff8111156135ac57600080fd5b6020830191508360208285010111156117f257600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561363a5761363a6135c4565b604052919050565b600067ffffffffffffffff83111561365c5761365c6135c4565b61368d60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f860116016135f3565b90508281528383830111156136a157600080fd5b828260208301376000602084830101529392505050565b600082601f8301126136c957600080fd5b61129f83833560208501613642565b60008060008060008060008060e0898b0312156136f457600080fd5b8835975061370460208a0161356c565b9650604089013567ffffffffffffffff8082111561372157600080fd5b61372d8c838d01613582565b909850965060608b013591508082111561374657600080fd5b506137538b828c016136b8565b94505061376260808a0161356c565b925060a0890135915060c089013590509295985092959890939650565b60006020828403121561379157600080fd5b5035919050565b6000815180845260005b818110156137be576020818501810151868301820152016137a2565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b60208152600061129f6020830184613798565b73ffffffffffffffffffffffffffffffffffffffff81168114610b4557600080fd5b6000806000806080858703121561384757600080fd5b84356138528161380f565b935060208501356138628161380f565b925060408501359150606085013567ffffffffffffffff81111561388557600080fd5b613891878288016136b8565b91505092959194509250565b600067ffffffffffffffff8211156138b7576138b76135c4565b5060051b60200190565b600082601f8301126138d257600080fd5b813560206138e76138e28361389d565b6135f3565b82815260059290921b8401810191818101908684111561390657600080fd5b8286015b8481101561392a57803561391d8161380f565b835291830191830161390a565b509695505050505050565b600082601f83011261394657600080fd5b813560206139566138e28361389d565b82815260059290921b8401810191818101908684111561397557600080fd5b8286015b8481101561392a5780358352918301918301613979565b600082601f8301126139a157600080fd5b813560206139b16138e28361389d565b82815260059290921b840181019181810190868411156139d057600080fd5b8286015b8481101561392a57803567ffffffffffffffff8111156139f45760008081fd5b613a028986838b01016136b8565b8452509183019183016139d4565b60008060008060808587031215613a2657600080fd5b843567ffffffffffffffff80821115613a3e57600080fd5b613a4a888389016138c1565b95506020870135915080821115613a6057600080fd5b613a6c88838901613935565b94506040870135915080821115613a8257600080fd5b50613a8f87828801613990565b949793965093946060013593505050565b600080600080600060a08688031215613ab857600080fd5b85359450613ac86020870161356c565b9350613ad66040870161356c565b94979396509394606081013594506080013592915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6020810160088310613b58577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b60008060408385031215613b7157600080fd5b823591506020830135613b838161380f565b809150509250929050565b60008060408385031215613ba157600080fd5b82359150613bb16020840161356c565b90509250929050565b600080600080600060808688031215613bd257600080fd5b85359450613be26020870161356c565b9350604086013567ffffffffffffffff80821115613bff57600080fd5b613c0b89838a01613582565b90955093506060880135915080821115613c2457600080fd5b50613c31888289016136b8565b9150509295509295909350565b60008060008060608587031215613c5457600080fd5b84359350613c646020860161356c565b9250604085013567ffffffffffffffff811115613c8057600080fd5b613c8c87828801613582565b95989497509550505050565b60008060008060808587031215613cae57600080fd5b843567ffffffffffffffff80821115613cc657600080fd5b613cd2888389016138c1565b95506020870135915080821115613ce857600080fd5b613cf488838901613935565b94506040870135915080821115613d0a57600080fd5b613d1688838901613990565b93506060870135915080821115613d2c57600080fd5b508501601f81018713613d3e57600080fd5b61389187823560208401613642565b600080600060608486031215613d6257600080fd5b8335613d6d8161380f565b925060208401359150604084013567ffffffffffffffff811115613d9057600080fd5b613d9c868287016136b8565b9150509250925092565b600060208284031215613db857600080fd5b813561129f8161380f565b600080600080600060a08688031215613ddb57600080fd5b8535613de68161380f565b94506020860135613df68161380f565b9350604086013567ffffffffffffffff80821115613e1357600080fd5b613e1f89838a01613935565b94506060880135915080821115613e3557600080fd5b613e4189838a01613935565b93506080880135915080821115613c2457600080fd5b60008060008060608587031215613e6d57600080fd5b8435613e788161380f565b935060208501359250604085013567ffffffffffffffff811115613c8057600080fd5b60008060408385031215613eae57600080fd5b8235613eb98161380f565b946020939093013593505050565b600080600080600060a08688031215613edf57600080fd5b8535613eea8161380f565b94506020860135613efa8161380f565b93506040860135925060608601359150608086013567ffffffffffffffff811115613f2457600080fd5b613c31888289016136b8565b8183823760009101908152919050565b600181811c90821680613f5457607f821691505b602082108103613f8d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600060208284031215613fa557600080fd5b5051919050565b600081518084526020808501945080840160005b83811015613ff257815173ffffffffffffffffffffffffffffffffffffffff1687529582019590820190600101613fc0565b509495945050505050565b600081518084526020808501945080840160005b83811015613ff257815187529582019590820190600101614011565b600081518084526020808501808196508360051b8101915082860160005b85811015614075578284038952614063848351613798565b9885019893509084019060010161404b565b5091979650505050505050565b60a08152600061409560a0830188613fac565b82810360208401526140a78188613ffd565b905082810360408401526140bb818761402d565b60608401959095525050608001529392505050565b60c0815260006140e360c0830189613fac565b82810360208401526140f58189613ffd565b90508281036040840152614109818861402d565b60608401969096525050608081019290925260a0909101529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561094a5761094a614128565b8181038181111561094a5761094a614128565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181815b8085111561420557817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211156141eb576141eb614128565b808516156141f857918102915b93841c93908002906141b1565b509250929050565b60008261421c5750600161094a565b816142295750600061094a565b816001811461423f576002811461424957614265565b600191505061094a565b60ff84111561425a5761425a614128565b50506001821b61094a565b5060208310610133831016604e8410600b8410161715614288575081810a61094a565b61429283836141ac565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211156142c4576142c4614128565b029392505050565b600061129f838361420d565b808202811582820484141761094a5761094a614128565b6080815260006143026080830187613fac565b82810360208401526143148187613ffd565b90508281036040840152614328818661402d565b91505082606083015295945050505050565b84815260ff8416602082015282604082015260806060820152600061126e6080830184613798565b85815260ff8516602082015283604082015260a06060820152600061438a60a0830185613798565b828103608084015261439c8185613798565b98975050505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036143d9576143d9614128565b5060010190565b6000602082840312156143f257600080fd5b8151801515811461129f57600080fd5b67ffffffffffffffff81811683821601908082111561442357614423614128565b5092915050565b60006101208b8352602073ffffffffffffffffffffffffffffffffffffffff8c16818501528160408501526144618285018c613fac565b91508382036060850152614475828b613ffd565b915083820360808501528189518084528284019150828160051b850101838c0160005b838110156144e4577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08784030185526144d2838351613798565b94860194925090850190600101614498565b505086810360a08801526144f8818c61402d565b94505050505061451460c084018767ffffffffffffffff169052565b67ffffffffffffffff851660e08401528281036101008401526145378185613798565b9c9b505050505050505050505050565b60008261457d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fe476f7665726e6f723a2072656c617920726576657274656420776974686f7574206d657373616765a26469706673582212206669cfa2025a0f2ef4b90a78aa5c809af350815b945c7fd526c8f6e9454edb9964736f6c63430008110033",
  },
  GovernorQuorumNonTimelock: {
    abi: [
      {
        inputs: [
          {
            internalType: "contract IVotes",
            name: "_token",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_votingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_votingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_proposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_quorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_tokenDecimals",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "Empty",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalCanceled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            indexed: false,
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          {
            indexed: false,
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "ProposalCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "VoteCast",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "VoteCastWithParams",
        type: "event",
      },
      {
        inputs: [],
        name: "BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "COUNTING_MODE",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "EXTENDED_BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
        ],
        name: "castVote",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "castVoteWithReason",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "castVoteWithReasonAndParams",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteWithReasonAndParamsBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "execute",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "getVotes",
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
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "getVotesWithParams",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasVoted",
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
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "hashProposal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalDeadline",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalSnapshot",
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
        inputs: [],
        name: "proposalThreshold",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalVotes",
        outputs: [
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "forVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "abstainVotes",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "propose",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorum",
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
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "relay",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "state",
        outputs: [
          {
            internalType: "enum IGovernor.ProposalState",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
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
        name: "token",
        outputs: [
          {
            internalType: "contract IVotes",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "votingDelay",
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
        inputs: [],
        name: "votingPeriod",
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
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x6101606040523480156200001257600080fd5b506040516200359f3803806200359f83398101604081905262000035916200013d565b868680620000576040805180820190915260018152603160f81b602082015290565b815160209283012081519183019190912060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818801819052818301969096526060810194909452608080850193909352308483018190528151808603909301835260c094850190915281519190950120905291909152610120526000620000f48282620002f1565b50506001600160a01b03166101405260059290925560069390935560079190915560089190915560095550620003bd9050565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a0312156200015957600080fd5b87516001600160a01b03811681146200017157600080fd5b602089810151919850906001600160401b03808211156200019157600080fd5b818b0191508b601f830112620001a657600080fd5b815181811115620001bb57620001bb62000127565b604051601f8201601f19908116603f01168101908382118183101715620001e657620001e662000127565b816040528281528e86848701011115620001ff57600080fd5b600093505b8284101562000223578484018601518185018701529285019262000204565b600092810190950191909152505050604089015160608a015160808b015160a08c015160c0909c01519a9d939c50919a90999198509650945092505050565b600181811c908216806200027757607f821691505b6020821081036200029857634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002ec57600081815260208120601f850160051c81016020861015620002c75750805b601f850160051c820191505b81811015620002e857828155600101620002d3565b5050505b505050565b81516001600160401b038111156200030d576200030d62000127565b62000325816200031e845462000262565b846200029e565b602080601f8311600181146200035d5760008415620003445750858301515b600019600386901b1c1916600185901b178555620002e8565b600085815260208120601f198616915b828110156200038e578886015182559484019460019091019084016200036d565b5085821015620003ad5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a05160c05160e0516101005161012051610140516131806200041f6000396000818161070301526119c301526000611b9d01526000611bec01526000611bc701526000611b2001526000611b4a01526000611b7401526131806000f3fe6080604052600436106101d15760003560e01c80635f398a14116100f7578063c28bc2fa11610095578063eb9019d411610064578063eb9019d41461066c578063f23a6e611461068c578063f8ce560a146106d1578063fc0c546a146106f157600080fd5b8063c28bc2fa146105bf578063c59057e4146105d2578063dd4e2ba5146105f2578063deaaa7cc1461063857600080fd5b80639a802a6d116100d15780639a802a6d14610525578063b58131b014610545578063bc197c811461055a578063c01f9e371461059f57600080fd5b80635f398a14146104c55780637b3c71d3146104e55780637d5e81e21461050557600080fd5b80632fe3e2611161016f578063438596321161013e57806343859632146103b3578063544ffc9c1461040a57806354fd4d501461045f57806356781388146104a557600080fd5b80632fe3e2611461031d5780633932abb1146103515780633bccf4fd146103665780633e4f49e61461038657600080fd5b806306fdde03116101ab57806306fdde0314610253578063150b7a02146102755780632656227d146102ea5780632d63f693146102fd57600080fd5b806301ffc9a7146101df57806302a251a314610214578063034201811461023357600080fd5b366101da57005b005b600080fd5b3480156101eb57600080fd5b506101ff6101fa3660046121b5565b61074a565b60405190151581526020015b60405180910390f35b34801561022057600080fd5b506007545b60405190815260200161020b565b34801561023f57600080fd5b5061022561024e36600461236a565b61087b565b34801561025f57600080fd5b50610268610973565b60405161020b919061247f565b34801561028157600080fd5b506102b96102903660046124b6565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200161020b565b6102256102f836600461268f565b610a05565b34801561030957600080fd5b5061022561031836600461271f565b610b85565b34801561032957600080fd5b506102257fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af8881565b34801561035d57600080fd5b50600654610225565b34801561037257600080fd5b50610225610381366004612738565b610bbe565b34801561039257600080fd5b506103a66103a136600461271f565b610c34565b60405161020b91906127b5565b3480156103bf57600080fd5b506101ff6103ce3660046127f6565b600082815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845260030190915290205460ff1692915050565b34801561041657600080fd5b5061044461042536600461271f565b6000908152600460205260409020805460018201546002909201549092565b6040805193845260208401929092529082015260600161020b565b34801561046b57600080fd5b5060408051808201909152600181527f31000000000000000000000000000000000000000000000000000000000000006020820152610268565b3480156104b157600080fd5b506102256104c0366004612822565b610d5d565b3480156104d157600080fd5b506102256104e0366004612845565b610d86565b3480156104f157600080fd5b506102256105003660046128c9565b610dd0565b34801561051157600080fd5b50610225610520366004612923565b610e22565b34801561053157600080fd5b506102256105403660046129d8565b61126f565b34801561055157600080fd5b50610225611286565b34801561056657600080fd5b506102b9610575366004612a2f565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b3480156105ab57600080fd5b506102256105ba36600461271f565b6112a9565b6101d86105cd366004612abf565b6112d9565b3480156105de57600080fd5b506102256105ed36600461268f565b6113f7565b3480156105fe57600080fd5b506040805180820190915260208082527f737570706f72743d627261766f2671756f72756d3d666f722c6162737461696e90820152610268565b34801561064457600080fd5b506102257f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f81565b34801561067857600080fd5b50610225610687366004612b01565b61144f565b34801561069857600080fd5b506102b96106a7366004612b2b565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b3480156106dd57600080fd5b506102256106ec36600461271f565b611470565b3480156106fd57600080fd5b506107257f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161020b565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fbf26d8970000000000000000000000000000000000000000000000000000000014806107dd57507fffffffff0000000000000000000000000000000000000000000000000000000082167f79dd796f00000000000000000000000000000000000000000000000000000000145b8061082957507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061087557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60008061091f6109177fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af888c8c8c8c6040516108b7929190612b90565b60405180910390208b805190602001206040516020016108fc959493929190948552602085019390935260ff9190911660408401526060830152608082015260a00190565b6040516020818303038152906040528051906020012061148e565b8686866114f7565b90506109658a828b8b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508d9250611515915050565b9a9950505050505050505050565b60606000805461098290612ba0565b80601f01602080910402602001604051908101604052809291908181526020018280546109ae90612ba0565b80156109fb5780601f106109d0576101008083540402835291602001916109fb565b820191906000526020600020905b8154815290600101906020018083116109de57829003601f168201915b5050505050905090565b600080610a14868686866113f7565b90506000610a2182610c34565b90506004816007811115610a3757610a37612786565b1480610a5457506005816007811115610a5257610a52612786565b145b610ae5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c0000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008281526001602081815260409283902060020180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690921790915590518381527f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f910160405180910390a1610b6182888888886116c9565b610b6e8288888888611770565b610b7b82888888886116c9565b5095945050505050565b600081815260016020908152604080832081519283019091525467ffffffffffffffff16908190525b67ffffffffffffffff1692915050565b604080517f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f602082015290810186905260ff851660608201526000908190610c0c90610917906080016108fc565b9050610c2987828860405180602001604052806000815250611873565b979650505050505050565b6000818152600160205260408120600281015460ff1615610c585750600792915050565b6002810154610100900460ff1615610c735750600292915050565b6000610c7e84610b85565b905080600003610cea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f476f7665726e6f723a20756e6b6e6f776e2070726f706f73616c2069640000006044820152606401610adc565b438110610cfb575060009392505050565b6000610d06856112a9565b9050438110610d1a57506001949350505050565b610d238561189f565b8015610d42575060008581526004602052604090208054600190910154115b15610d5257506004949350505050565b506003949350505050565b600080339050610d7e84828560405180602001604052806000815250611873565b949350505050565b600080339050610c2987828888888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a9250611515915050565b600080339050610e1886828787878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061187392505050565b9695505050505050565b6000610e2c611286565b610e3b33610687600143612c22565b1015610ec9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f476f7665726e6f723a2070726f706f73657220766f7465732062656c6f77207060448201527f726f706f73616c207468726573686f6c640000000000000000000000000000006064820152608401610adc565b6000610ede86868686805190602001206113f7565b90508451865114610f71576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610adc565b8351865114611002576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610adc565b600086511161106d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a20656d7074792070726f706f73616c00000000000000006044820152606401610adc565b6000818152600160209081526040918290208251918201909252815467ffffffffffffffff169081905215611124576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c20616c726561647920657869737460448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610adc565b600061113761113260065490565b6118d6565b611140436118d6565b61114a9190612c35565b9050600061115a61113260075490565b6111649083612c35565b83547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff841617845590506001830180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff83161790557f7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e084338b8b8d5167ffffffffffffffff81111561120d5761120d612256565b60405190808252806020026020018201604052801561124057816020015b606081526020019060019003908161122b5790505b508c88888e60405161125a99989796959493929190612d33565b60405180910390a15091979650505050505050565b600061127c848484611974565b90505b9392505050565b6000600954600a6112979190612f70565b6005546112a49190612f7c565b905090565b600081815260016020818152604080842081519283019091529091015467ffffffffffffffff1690819052610bae565b333014611342576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610adc565b611359565b806113526002611a30565b0361134757505b6000808573ffffffffffffffffffffffffffffffffffffffff16858585604051611384929190612b90565b60006040518083038185875af1925050503d80600081146113c1576040519150601f19603f3d011682016040523d82523d6000602084013e6113c6565b606091505b50915091506113ee82826040518060600160405280602881526020016130fc60289139611aed565b50505050505050565b6000848484846040516020016114109493929190612f93565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012095945050505050565b600061127f838361146b60408051602081019091526000815290565b611974565b6000600954600a6114819190612f70565b6008546108759190612f7c565b600061087561149b611b06565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b600080600061150887878787611c3a565b91509150610b7b81611d29565b600085815260016020819052604082209061152f88610c34565b600781111561154057611540612786565b146115cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f476f7665726e6f723a20766f7465206e6f742063757272656e746c792061637460448201527f69766500000000000000000000000000000000000000000000000000000000006064820152608401610adc565b6040805160208101909152815467ffffffffffffffff16908190526000906115f790889086611974565b90506116068888888488611edf565b8351600003611668578673ffffffffffffffffffffffffffffffffffffffff167fb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda48988848960405161165b9493929190612fde565b60405180910390a2610c29565b8673ffffffffffffffffffffffffffffffffffffffff167fe2babfbac5889a709b63bb7f598b324e08bc5a4fb9ec647fb3cbc9ec07eb871289888489896040516116b6959493929190613006565b60405180910390a2979650505050505050565b611769565b8451811015611767573073ffffffffffffffffffffffffffffffffffffffff168582815181106117005761170061304c565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603611757576117578382815181106117385761173861304c565b602002602001015180519060200120600261211f90919063ffffffff16565b6117608161307b565b90506116ce565b505b5050505050565b600060405180606001604052806027815260200161312460279139905060005b85518110156113ee576000808783815181106117ae576117ae61304c565b602002602001015173ffffffffffffffffffffffffffffffffffffffff168784815181106117de576117de61304c565b60200260200101518785815181106117f8576117f861304c565b602002602001015160405161180d91906130b3565b60006040518083038185875af1925050503d806000811461184a576040519150601f19603f3d011682016040523d82523d6000602084013e61184f565b606091505b509150915061185f828286611aed565b5050508061186c9061307b565b9050611790565b60006118968585858561189160408051602081019091526000815290565b611515565b95945050505050565b6000818152600460205260408120600281015460018201546118c191906130cf565b6118cd6106ec85610b85565b11159392505050565b600067ffffffffffffffff821115611970576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203660448201527f34206269747300000000000000000000000000000000000000000000000000006064820152608401610adc565b5090565b6040517f3a46b1a800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152602482018490526000917f000000000000000000000000000000000000000000000000000000000000000090911690633a46b1a890604401602060405180830381865afa158015611a0c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061127c91906130e2565b6000611a588254600f81810b700100000000000000000000000000000000909204900b131590565b15611a8f576040517f3db2a12a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b508054600f0b6000818152600180840160205260408220805492905583547fffffffffffffffffffffffffffffffff000000000000000000000000000000001692016fffffffffffffffffffffffffffffffff169190911790915590565b60608315611afc57508161127f565b61127f8383612171565b60003073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016148015611b6c57507f000000000000000000000000000000000000000000000000000000000000000046145b15611b9657507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611c715750600090506003611d20565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611cc5573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116611d1957600060019250925050611d20565b9150600090505b94509492505050565b6000816004811115611d3d57611d3d612786565b03611d455750565b6001816004811115611d5957611d59612786565b03611dc0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610adc565b6002816004811115611dd457611dd4612786565b03611e3b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610adc565b6003816004811115611e4f57611e4f612786565b03611edc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610adc565b50565b600085815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452600381019092529091205460ff1615611fa4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f476f7665726e6f72566f74696e6753696d706c653a20766f746520616c72656160448201527f64792063617374000000000000000000000000000000000000000000000000006064820152608401610adc565b73ffffffffffffffffffffffffffffffffffffffff85166000908152600382016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905560ff841661201b578281600001600082825461201091906130cf565b909155506117679050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60ff851601612059578281600101600082825461201091906130cf565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe60ff851601612097578281600201600082825461201091906130cf565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f476f7665726e6f72566f74696e6753696d706c653a20696e76616c696420766160448201527f6c756520666f7220656e756d20566f74655479706500000000000000000000006064820152608401610adc565b815470010000000000000000000000000000000090819004600f0b6000818152600180860160205260409091209390935583546fffffffffffffffffffffffffffffffff908116939091011602179055565b8151156121815781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610adc919061247f565b6000602082840312156121c757600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461127f57600080fd5b803560ff8116811461220857600080fd5b919050565b60008083601f84011261221f57600080fd5b50813567ffffffffffffffff81111561223757600080fd5b60208301915083602082850101111561224f57600080fd5b9250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156122cc576122cc612256565b604052919050565b600067ffffffffffffffff8311156122ee576122ee612256565b61231f60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f86011601612285565b905082815283838301111561233357600080fd5b828260208301376000602084830101529392505050565b600082601f83011261235b57600080fd5b61127f838335602085016122d4565b60008060008060008060008060e0898b03121561238657600080fd5b8835975061239660208a016121f7565b9650604089013567ffffffffffffffff808211156123b357600080fd5b6123bf8c838d0161220d565b909850965060608b01359150808211156123d857600080fd5b506123e58b828c0161234a565b9450506123f460808a016121f7565b925060a0890135915060c089013590509295985092959890939650565b60005b8381101561242c578181015183820152602001612414565b50506000910152565b6000815180845261244d816020860160208601612411565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061127f6020830184612435565b803573ffffffffffffffffffffffffffffffffffffffff8116811461220857600080fd5b600080600080608085870312156124cc57600080fd5b6124d585612492565b93506124e360208601612492565b925060408501359150606085013567ffffffffffffffff81111561250657600080fd5b6125128782880161234a565b91505092959194509250565b600067ffffffffffffffff82111561253857612538612256565b5060051b60200190565b600082601f83011261255357600080fd5b813560206125686125638361251e565b612285565b82815260059290921b8401810191818101908684111561258757600080fd5b8286015b848110156125a95761259c81612492565b835291830191830161258b565b509695505050505050565b600082601f8301126125c557600080fd5b813560206125d56125638361251e565b82815260059290921b840181019181810190868411156125f457600080fd5b8286015b848110156125a957803583529183019183016125f8565b600082601f83011261262057600080fd5b813560206126306125638361251e565b82815260059290921b8401810191818101908684111561264f57600080fd5b8286015b848110156125a957803567ffffffffffffffff8111156126735760008081fd5b6126818986838b010161234a565b845250918301918301612653565b600080600080608085870312156126a557600080fd5b843567ffffffffffffffff808211156126bd57600080fd5b6126c988838901612542565b955060208701359150808211156126df57600080fd5b6126eb888389016125b4565b9450604087013591508082111561270157600080fd5b5061270e8782880161260f565b949793965093946060013593505050565b60006020828403121561273157600080fd5b5035919050565b600080600080600060a0868803121561275057600080fd5b85359450612760602087016121f7565b935061276e604087016121f7565b94979396509394606081013594506080013592915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60208101600883106127f0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b6000806040838503121561280957600080fd5b8235915061281960208401612492565b90509250929050565b6000806040838503121561283557600080fd5b82359150612819602084016121f7565b60008060008060006080868803121561285d57600080fd5b8535945061286d602087016121f7565b9350604086013567ffffffffffffffff8082111561288a57600080fd5b61289689838a0161220d565b909550935060608801359150808211156128af57600080fd5b506128bc8882890161234a565b9150509295509295909350565b600080600080606085870312156128df57600080fd5b843593506128ef602086016121f7565b9250604085013567ffffffffffffffff81111561290b57600080fd5b6129178782880161220d565b95989497509550505050565b6000806000806080858703121561293957600080fd5b843567ffffffffffffffff8082111561295157600080fd5b61295d88838901612542565b9550602087013591508082111561297357600080fd5b61297f888389016125b4565b9450604087013591508082111561299557600080fd5b6129a18883890161260f565b935060608701359150808211156129b757600080fd5b508501601f810187136129c957600080fd5b612512878235602084016122d4565b6000806000606084860312156129ed57600080fd5b6129f684612492565b925060208401359150604084013567ffffffffffffffff811115612a1957600080fd5b612a258682870161234a565b9150509250925092565b600080600080600060a08688031215612a4757600080fd5b612a5086612492565b9450612a5e60208701612492565b9350604086013567ffffffffffffffff80821115612a7b57600080fd5b612a8789838a016125b4565b94506060880135915080821115612a9d57600080fd5b612aa989838a016125b4565b935060808801359150808211156128af57600080fd5b60008060008060608587031215612ad557600080fd5b612ade85612492565b935060208501359250604085013567ffffffffffffffff81111561290b57600080fd5b60008060408385031215612b1457600080fd5b612b1d83612492565b946020939093013593505050565b600080600080600060a08688031215612b4357600080fd5b612b4c86612492565b9450612b5a60208701612492565b93506040860135925060608601359150608086013567ffffffffffffffff811115612b8457600080fd5b6128bc8882890161234a565b8183823760009101908152919050565b600181811c90821680612bb457607f821691505b602082108103612bed577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111561087557610875612bf3565b67ffffffffffffffff818116838216019080821115612c5657612c56612bf3565b5092915050565b600081518084526020808501945080840160005b83811015612ca357815173ffffffffffffffffffffffffffffffffffffffff1687529582019590820190600101612c71565b509495945050505050565b600081518084526020808501945080840160005b83811015612ca357815187529582019590820190600101612cc2565b600081518084526020808501808196508360051b8101915082860160005b85811015612d26578284038952612d14848351612435565b98850198935090840190600101612cfc565b5091979650505050505050565b60006101208b8352602073ffffffffffffffffffffffffffffffffffffffff8c1681850152816040850152612d6a8285018c612c5d565b91508382036060850152612d7e828b612cae565b915083820360808501528189518084528284019150828160051b850101838c0160005b83811015612ded577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0878403018552612ddb838351612435565b94860194925090850190600101612da1565b505086810360a0880152612e01818c612cde565b945050505050612e1d60c084018767ffffffffffffffff169052565b67ffffffffffffffff851660e0840152828103610100840152612e408185612435565b9c9b505050505050505050505050565b600181815b80851115612ea957817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115612e8f57612e8f612bf3565b80851615612e9c57918102915b93841c9390800290612e55565b509250929050565b600082612ec057506001610875565b81612ecd57506000610875565b8160018114612ee35760028114612eed57612f09565b6001915050610875565b60ff841115612efe57612efe612bf3565b50506001821b610875565b5060208310610133831016604e8410600b8410161715612f2c575081810a610875565b612f368383612e50565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115612f6857612f68612bf3565b029392505050565b600061127f8383612eb1565b808202811582820484141761087557610875612bf3565b608081526000612fa66080830187612c5d565b8281036020840152612fb88187612cae565b90508281036040840152612fcc8186612cde565b91505082606083015295945050505050565b84815260ff84166020820152826040820152608060608201526000610e186080830184612435565b85815260ff8516602082015283604082015260a06060820152600061302e60a0830185612435565b82810360808401526130408185612435565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036130ac576130ac612bf3565b5060010190565b600082516130c5818460208701612411565b9190910192915050565b8082018082111561087557610875612bf3565b6000602082840312156130f457600080fd5b505191905056fe476f7665726e6f723a2072656c617920726576657274656420776974686f7574206d657373616765476f7665726e6f723a2063616c6c20726576657274656420776974686f7574206d657373616765a26469706673582212207c924893fc866961af95e83f1348151040b3423a5718d66de3a5319964f1fb2464736f6c63430008110033",
  },
  GovernorQuorumTimelock: {
    abi: [
      {
        inputs: [
          {
            internalType: "contract IVotes",
            name: "_token",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_votingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_votingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_proposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_quorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_tokenDecimals",
            type: "uint256",
          },
          {
            internalType: "contract TimelockController",
            name: "_timelock",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "Empty",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalCanceled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            indexed: false,
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          {
            indexed: false,
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "ProposalCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "ProposalExecuted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "eta",
            type: "uint256",
          },
        ],
        name: "ProposalQueued",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "oldTimelock",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "newTimelock",
            type: "address",
          },
        ],
        name: "TimelockChange",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "VoteCast",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "VoteCastWithParams",
        type: "event",
      },
      {
        inputs: [],
        name: "BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "COUNTING_MODE",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "EXTENDED_BALLOT_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
        ],
        name: "castVote",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "castVoteWithReason",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "castVoteWithReasonAndParams",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "support",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "castVoteWithReasonAndParamsBySig",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "execute",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "getVotes",
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
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "getVotesWithParams",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasVoted",
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
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "hashProposal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalDeadline",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalEta",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalSnapshot",
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
        inputs: [],
        name: "proposalThreshold",
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
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "proposalVotes",
        outputs: [
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "forVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "abstainVotes",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "propose",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "calldatas",
            type: "bytes[]",
          },
          {
            internalType: "bytes32",
            name: "descriptionHash",
            type: "bytes32",
          },
        ],
        name: "queue",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        name: "quorum",
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
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "relay",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        name: "state",
        outputs: [
          {
            internalType: "enum IGovernor.ProposalState",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
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
        name: "timelock",
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
      {
        inputs: [],
        name: "token",
        outputs: [
          {
            internalType: "contract IVotes",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract TimelockController",
            name: "newTimelock",
            type: "address",
          },
        ],
        name: "updateTimelock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "votingDelay",
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
        inputs: [],
        name: "votingPeriod",
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
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x6101606040523480156200001257600080fd5b5060405162003fed38038062003fed8339810160408190526200003591620001df565b80888880620000586040805180820190915260018152603160f81b602082015290565b815160209283012081519183019190912060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818801819052818301969096526060810194909452608080850193909352308483018190528151808603909301835260c094850190915281519190950120905291909152610120526000620000f582826200039c565b50506001600160a01b0316610140526200010f8162000135565b5050600792909255600893909355600991909155600b91909155600a5550620004689050565b600554604080516001600160a01b03928316815291831660208301527f08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401910160405180910390a1600580546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001b457600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b8051620001da816200019e565b919050565b600080600080600080600080610100898b031215620001fd57600080fd5b88516200020a816200019e565b60208a810151919950906001600160401b03808211156200022a57600080fd5b818c0191508c601f8301126200023f57600080fd5b815181811115620002545762000254620001b7565b604051601f8201601f19908116603f011681019083821181831017156200027f576200027f620001b7565b816040528281528f868487010111156200029857600080fd5b600093505b82841015620002bc57848401860151818501870152928501926200029d565b6000868483010152809c5050505050505060408901519550606089015194506080890151935060a0890151925060c08901519150620002fe60e08a01620001cd565b90509295985092959890939650565b600181811c908216806200032257607f821691505b6020821081036200034357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200039757600081815260208120601f850160051c81016020861015620003725750805b601f850160051c820191505b8181101562000393578281556001016200037e565b5050505b505050565b81516001600160401b03811115620003b857620003b8620001b7565b620003d081620003c984546200030d565b8462000349565b602080601f831160018114620004085760008415620003ef5750858301515b600019600386901b1c1916600185901b17855562000393565b600085815260208120601f198616915b82811015620004395788860151825594840194600190910190840162000418565b5085821015620004585787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a05160c05160e051610100516101205161014051613b23620004ca600039600081816108220152611e50015260006121f4015260006122430152600061221e01526000612177015260006121a1015260006121cb0152613b236000f3fe60806040526004361061021d5760003560e01c80637b3c71d31161011d578063c28bc2fa116100b0578063deaaa7cc1161007f578063f23a6e6111610064578063f23a6e61146107ab578063f8ce560a146107f0578063fc0c546a1461081057600080fd5b8063deaaa7cc14610757578063eb9019d41461078b57600080fd5b8063c28bc2fa14610692578063c59057e4146106a5578063d33219b4146106c5578063dd4e2ba51461071157600080fd5b8063ab58fb8e116100ec578063ab58fb8e146105f8578063b58131b014610618578063bc197c811461062d578063c01f9e371461067257600080fd5b80637b3c71d3146105785780637d5e81e2146105985780639a802a6d146105b8578063a890c910146105d857600080fd5b80632fe3e261116101b0578063438596321161017f57806354fd4d501161016457806354fd4d50146104f257806356781388146105385780635f398a141461055857600080fd5b80634385963214610446578063544ffc9c1461049d57600080fd5b80632fe3e261146103b05780633932abb1146103e45780633bccf4fd146103f95780633e4f49e61461041957600080fd5b8063150b7a02116101ec578063150b7a02146102e8578063160cbed71461035d5780632656227d1461037d5780632d63f6931461039057600080fd5b806301ffc9a71461025257806302a251a31461028757806303420181146102a657806306fdde03146102c657600080fd5b3661024d573061022b610844565b73ffffffffffffffffffffffffffffffffffffffff161461024b57600080fd5b005b600080fd5b34801561025e57600080fd5b5061027261026d366004612aa1565b61086a565b60405190151581526020015b60405180910390f35b34801561029357600080fd5b506009545b60405190815260200161027e565b3480156102b257600080fd5b506102986102c1366004612c56565b61087b565b3480156102d257600080fd5b506102db610973565b60405161027e9190612d61565b3480156102f457600080fd5b5061032c610303366004612d96565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200161027e565b34801561036957600080fd5b50610298610378366004612f75565b610a05565b61029861038b366004612f75565b610cec565b34801561039c57600080fd5b506102986103ab366004613005565b610e67565b3480156103bc57600080fd5b506102987fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af8881565b3480156103f057600080fd5b50600854610298565b34801561040557600080fd5b5061029861041436600461301e565b610ea0565b34801561042557600080fd5b50610439610434366004613005565b610f16565b60405161027e919061309b565b34801561045257600080fd5b506102726104613660046130dc565b600082815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845260030190915290205460ff1692915050565b3480156104a957600080fd5b506104d76104b8366004613005565b6000908152600460205260409020805460018201546002909201549092565b6040805193845260208401929092529082015260600161027e565b3480156104fe57600080fd5b5060408051808201909152600181527f310000000000000000000000000000000000000000000000000000000000000060208201526102db565b34801561054457600080fd5b5061029861055336600461310c565b610f21565b34801561056457600080fd5b50610298610573366004613138565b610f4a565b34801561058457600080fd5b506102986105933660046131bc565b610f94565b3480156105a457600080fd5b506102986105b3366004613216565b610fe6565b3480156105c457600080fd5b506102986105d33660046132cb565b610ffd565b3480156105e457600080fd5b5061024b6105f3366004613324565b611014565b34801561060457600080fd5b50610298610613366004613005565b61110f565b34801561062457600080fd5b506102986111cf565b34801561063957600080fd5b5061032c610648366004613341565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b34801561067e57600080fd5b5061029861068d366004613005565b6111ed565b61024b6106a03660046133d5565b61121d565b3480156106b157600080fd5b506102986106c0366004612f75565b6113aa565b3480156106d157600080fd5b5060055473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161027e565b34801561071d57600080fd5b506040805180820190915260208082527f737570706f72743d627261766f2671756f72756d3d666f722c6162737461696e908201526102db565b34801561076357600080fd5b506102987f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f81565b34801561079757600080fd5b506102986107a6366004613419565b611402565b3480156107b757600080fd5b5061032c6107c6366004613445565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b3480156107fc57600080fd5b5061029861080b366004613005565b611423565b34801561081c57600080fd5b506106ec7f000000000000000000000000000000000000000000000000000000000000000081565b600061086560055473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b600061087582611441565b92915050565b60008061091f6109177fb3b3f3b703cd84ce352197dcff232b1b5d3cfb2025ce47cf04742d0651f1af888c8c8c8c6040516108b79291906134ae565b60405180910390208b805190602001206040516020016108fc959493929190948552602085019390935260ff9190911660408401526060830152608082015260a00190565b60405160208183030381529060405280519060200120611497565b868686611500565b90506109658a828b8b8b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508d925061151e915050565b9a9950505050505050505050565b606060008054610982906134be565b80601f01602080910402602001604051908101604052809291908181526020018280546109ae906134be565b80156109fb5780601f106109d0576101008083540402835291602001916109fb565b820191906000526020600020905b8154815290600101906020018083116109de57829003601f168201915b5050505050905090565b600080610a14868686866113aa565b90506004610a2182610f16565b6007811115610a3257610a3261306c565b14610ac4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c0000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600554604080517ff27a0c92000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163f27a0c929160048083019260209291908290030181865afa158015610b34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b589190613511565b6005546040517fb1c5f42700000000000000000000000000000000000000000000000000000000815291925073ffffffffffffffffffffffffffffffffffffffff169063b1c5f42790610bb8908a908a908a906000908b90600401613600565b602060405180830381865afa158015610bd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf99190613511565b6000838152600660205260408082209290925560055491517f8f2a0bb000000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90921691638f2a0bb091610c6a918b918b918b91908b90899060040161364e565b600060405180830381600087803b158015610c8457600080fd5b505af1158015610c98573d6000803e3d6000fd5b505050507f9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892828242610cca91906136d5565b6040805192835260208301919091520160405180910390a15095945050505050565b600080610cfb868686866113aa565b90506000610d0882610f16565b90506004816007811115610d1e57610d1e61306c565b1480610d3b57506005816007811115610d3957610d3961306c565b145b610dc7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c206e6f742073756363657373667560448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610abb565b60008281526001602081815260409283902060020180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690921790915590518381527f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f910160405180910390a1610e4382888888886116d2565b610e50828888888861179b565b610e5d82888888886117a8565b5095945050505050565b600081815260016020908152604080832081519283019091525467ffffffffffffffff16908190525b67ffffffffffffffff1692915050565b604080517f150214d74d59b7d1e90c73fc22ef3d991dd0a76b046543d4d80ab92d2a50328f602082015290810186905260ff851660608201526000908190610eee90610917906080016108fc565b9050610f0b878288604051806020016040528060008152506117fb565b979650505050505050565b60006108758261181e565b600080339050610f42848285604051806020016040528060008152506117fb565b949350505050565b600080339050610f0b87828888888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a925061151e915050565b600080339050610fdc86828787878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117fb92505050565b9695505050505050565b6000610ff4858585856119b4565b95945050505050565b600061100a848484611e01565b90505b9392505050565b61101c610844565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146110b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610abb565b306110b9610844565b73ffffffffffffffffffffffffffffffffffffffff161461110357600080366040516110e69291906134ae565b604051809103902090505b806110fc6002611ebd565b036110f157505b61110c81611f7a565b50565b6005546000828152600660205260408082205490517fd45c443500000000000000000000000000000000000000000000000000000000815260048101919091529091829173ffffffffffffffffffffffffffffffffffffffff9091169063d45c443590602401602060405180830381865afa158015611192573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b69190613511565b9050806001146111c6578061100d565b60009392505050565b6000600a54600a6111e09190613808565b6007546108659190613814565b600081815260016020818152604080842081519283019091529091015467ffffffffffffffff1690819052610e90565b611225610844565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146112b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a206f6e6c79476f7665726e616e636500000000000000006044820152606401610abb565b306112c2610844565b73ffffffffffffffffffffffffffffffffffffffff161461130c57600080366040516112ef9291906134ae565b604051809103902090505b806113056002611ebd565b036112fa57505b6000808573ffffffffffffffffffffffffffffffffffffffff168585856040516113379291906134ae565b60006040518083038185875af1925050503d8060008114611374576040519150601f19603f3d011682016040523d82523d6000602084013e611379565b606091505b50915091506113a18282604051806060016040528060288152602001613ac660289139612015565b50505050505050565b6000848484846040516020016113c3949392919061382b565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012095945050505050565b600061100d838361141e60408051602081019091526000815290565b611e01565b6000600a54600a6114349190613808565b600b546108759190613814565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f6e665ced00000000000000000000000000000000000000000000000000000000148061087557506108758261202e565b60006108756114a461215d565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b600080600061151187878787612291565b91509150610e5d81612380565b600085815260016020819052604082209061153888610f16565b60078111156115495761154961306c565b146115d6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f476f7665726e6f723a20766f7465206e6f742063757272656e746c792061637460448201527f69766500000000000000000000000000000000000000000000000000000000006064820152608401610abb565b6040805160208101909152815467ffffffffffffffff169081905260009061160090889086611e01565b905061160f8888888488612533565b8351600003611671578673ffffffffffffffffffffffffffffffffffffffff167fb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda4898884896040516116649493929190613876565b60405180910390a2610f0b565b8673ffffffffffffffffffffffffffffffffffffffff167fe2babfbac5889a709b63bb7f598b324e08bc5a4fb9ec647fb3cbc9ec07eb871289888489896040516116bf95949392919061389e565b60405180910390a2979650505050505050565b306116db610844565b73ffffffffffffffffffffffffffffffffffffffff16146117945760005b8451811015611792573073ffffffffffffffffffffffffffffffffffffffff1685828151811061172b5761172b6138e4565b602002602001015173ffffffffffffffffffffffffffffffffffffffff160361178257611782838281518110611763576117636138e4565b602002602001015180519060200120600261277390919063ffffffff16565b61178b81613913565b90506116f9565b505b5050505050565b61179485858585856127c5565b306117b1610844565b73ffffffffffffffffffffffffffffffffffffffff161461179457600254600f81810b700100000000000000000000000000000000909204900b1315611794576000600255611794565b6000610ff48585858561181960408051602081019091526000815290565b61151e565b60008061182a8361285f565b905060048160078111156118405761184061306c565b1461184b5792915050565b60008381526006602052604090205480611866575092915050565b6005546040517f2ab0f5290000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690632ab0f52990602401602060405180830381865afa1580156118d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118f9919061394b565b15611908575060079392505050565b6005546040517f584b153e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff9091169063584b153e90602401602060405180830381865afa158015611977573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061199b919061394b565b156119aa575060059392505050565b5060029392505050565b60006119be6111cf565b6119cd336107a660014361396d565b1015611a5b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f476f7665726e6f723a2070726f706f73657220766f7465732062656c6f77207060448201527f726f706f73616c207468726573686f6c640000000000000000000000000000006064820152608401610abb565b6000611a7086868686805190602001206113aa565b90508451865114611b03576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610abb565b8351865114611b94576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a20696e76616c69642070726f706f73616c206c656e677460448201527f68000000000000000000000000000000000000000000000000000000000000006064820152608401610abb565b6000865111611bff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f476f7665726e6f723a20656d7074792070726f706f73616c00000000000000006044820152606401610abb565b6000818152600160209081526040918290208251918201909252815467ffffffffffffffff169081905215611cb6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f476f7665726e6f723a2070726f706f73616c20616c726561647920657869737460448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610abb565b6000611cc9611cc460085490565b612988565b611cd243612988565b611cdc9190613980565b90506000611cec611cc460095490565b611cf69083613980565b83547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff841617845590506001830180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff83161790557f7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e084338b8b8d5167ffffffffffffffff811115611d9f57611d9f612b42565b604051908082528060200260200182016040528015611dd257816020015b6060815260200190600190039081611dbd5790505b508c88888e604051611dec999897969594939291906139a8565b60405180910390a15091979650505050505050565b6040517f3a46b1a800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152602482018490526000917f000000000000000000000000000000000000000000000000000000000000000090911690633a46b1a890604401602060405180830381865afa158015611e99573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100a9190613511565b6000611ee58254600f81810b700100000000000000000000000000000000909204900b131590565b15611f1c576040517f3db2a12a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b508054600f0b6000818152600180840160205260408220805492905583547fffffffffffffffffffffffffffffffff000000000000000000000000000000001692016fffffffffffffffffffffffffffffffff169190911790915590565b6005546040805173ffffffffffffffffffffffffffffffffffffffff928316815291831660208301527f08f74ea46ef7894f65eabfb5e6e695de773a000b47c529ab559178069b226401910160405180910390a1600580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6060831561202457508161100d565b61100d8383612a26565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fbf26d8970000000000000000000000000000000000000000000000000000000014806120c157507fffffffff0000000000000000000000000000000000000000000000000000000082167f79dd796f00000000000000000000000000000000000000000000000000000000145b8061210d57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061087557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610875565b60003073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161480156121c357507f000000000000000000000000000000000000000000000000000000000000000046145b156121ed57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156122c85750600090506003612377565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561231c573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811661237057600060019250925050612377565b9150600090505b94509492505050565b60008160048111156123945761239461306c565b0361239c5750565b60018160048111156123b0576123b061306c565b03612417576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610abb565b600281600481111561242b5761242b61306c565b03612492576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610abb565b60038160048111156124a6576124a661306c565b0361110c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610abb565b600085815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452600381019092529091205460ff16156125f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f476f7665726e6f72566f74696e6753696d706c653a20766f746520616c72656160448201527f64792063617374000000000000000000000000000000000000000000000000006064820152608401610abb565b73ffffffffffffffffffffffffffffffffffffffff85166000908152600382016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905560ff841661266f578281600001600082825461266491906136d5565b909155506117929050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60ff8516016126ad578281600101600082825461266491906136d5565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe60ff8516016126eb578281600201600082825461266491906136d5565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f476f7665726e6f72566f74696e6753696d706c653a20696e76616c696420766160448201527f6c756520666f7220656e756d20566f74655479706500000000000000000000006064820152608401610abb565b815470010000000000000000000000000000000090819004600f0b6000818152600180860160205260409091209390935583546fffffffffffffffffffffffffffffffff908116939091011602179055565b6005546040517fe38335e500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063e38335e5903490612826908890889088906000908990600401613600565b6000604051808303818588803b15801561283f57600080fd5b505af1158015612853573d6000803e3d6000fd5b50505050505050505050565b6000818152600160205260408120600281015460ff16156128835750600792915050565b6002810154610100900460ff161561289e5750600292915050565b60006128a984610e67565b905080600003612915576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f476f7665726e6f723a20756e6b6e6f776e2070726f706f73616c2069640000006044820152606401610abb565b438110612926575060009392505050565b6000612931856111ed565b905043811061294557506001949350505050565b61294e85612a6a565b801561296d575060008581526004602052604090208054600190910154115b1561297d57506004949350505050565b506003949350505050565b600067ffffffffffffffff821115612a22576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203660448201527f34206269747300000000000000000000000000000000000000000000000000006064820152608401610abb565b5090565b815115612a365781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abb9190612d61565b600081815260046020526040812060028101546001820154612a8c91906136d5565b612a9861080b85610e67565b11159392505050565b600060208284031215612ab357600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461100d57600080fd5b803560ff81168114612af457600080fd5b919050565b60008083601f840112612b0b57600080fd5b50813567ffffffffffffffff811115612b2357600080fd5b602083019150836020828501011115612b3b57600080fd5b9250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612bb857612bb8612b42565b604052919050565b600067ffffffffffffffff831115612bda57612bda612b42565b612c0b60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f86011601612b71565b9050828152838383011115612c1f57600080fd5b828260208301376000602084830101529392505050565b600082601f830112612c4757600080fd5b61100d83833560208501612bc0565b60008060008060008060008060e0898b031215612c7257600080fd5b88359750612c8260208a01612ae3565b9650604089013567ffffffffffffffff80821115612c9f57600080fd5b612cab8c838d01612af9565b909850965060608b0135915080821115612cc457600080fd5b50612cd18b828c01612c36565b945050612ce060808a01612ae3565b925060a0890135915060c089013590509295985092959890939650565b6000815180845260005b81811015612d2357602081850181015186830182015201612d07565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b60208152600061100d6020830184612cfd565b73ffffffffffffffffffffffffffffffffffffffff8116811461110c57600080fd5b60008060008060808587031215612dac57600080fd5b8435612db781612d74565b93506020850135612dc781612d74565b925060408501359150606085013567ffffffffffffffff811115612dea57600080fd5b612df687828801612c36565b91505092959194509250565b600067ffffffffffffffff821115612e1c57612e1c612b42565b5060051b60200190565b600082601f830112612e3757600080fd5b81356020612e4c612e4783612e02565b612b71565b82815260059290921b84018101918181019086841115612e6b57600080fd5b8286015b84811015612e8f578035612e8281612d74565b8352918301918301612e6f565b509695505050505050565b600082601f830112612eab57600080fd5b81356020612ebb612e4783612e02565b82815260059290921b84018101918181019086841115612eda57600080fd5b8286015b84811015612e8f5780358352918301918301612ede565b600082601f830112612f0657600080fd5b81356020612f16612e4783612e02565b82815260059290921b84018101918181019086841115612f3557600080fd5b8286015b84811015612e8f57803567ffffffffffffffff811115612f595760008081fd5b612f678986838b0101612c36565b845250918301918301612f39565b60008060008060808587031215612f8b57600080fd5b843567ffffffffffffffff80821115612fa357600080fd5b612faf88838901612e26565b95506020870135915080821115612fc557600080fd5b612fd188838901612e9a565b94506040870135915080821115612fe757600080fd5b50612ff487828801612ef5565b949793965093946060013593505050565b60006020828403121561301757600080fd5b5035919050565b600080600080600060a0868803121561303657600080fd5b8535945061304660208701612ae3565b935061305460408701612ae3565b94979396509394606081013594506080013592915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60208101600883106130d6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b91905290565b600080604083850312156130ef57600080fd5b82359150602083013561310181612d74565b809150509250929050565b6000806040838503121561311f57600080fd5b8235915061312f60208401612ae3565b90509250929050565b60008060008060006080868803121561315057600080fd5b8535945061316060208701612ae3565b9350604086013567ffffffffffffffff8082111561317d57600080fd5b61318989838a01612af9565b909550935060608801359150808211156131a257600080fd5b506131af88828901612c36565b9150509295509295909350565b600080600080606085870312156131d257600080fd5b843593506131e260208601612ae3565b9250604085013567ffffffffffffffff8111156131fe57600080fd5b61320a87828801612af9565b95989497509550505050565b6000806000806080858703121561322c57600080fd5b843567ffffffffffffffff8082111561324457600080fd5b61325088838901612e26565b9550602087013591508082111561326657600080fd5b61327288838901612e9a565b9450604087013591508082111561328857600080fd5b61329488838901612ef5565b935060608701359150808211156132aa57600080fd5b508501601f810187136132bc57600080fd5b612df687823560208401612bc0565b6000806000606084860312156132e057600080fd5b83356132eb81612d74565b925060208401359150604084013567ffffffffffffffff81111561330e57600080fd5b61331a86828701612c36565b9150509250925092565b60006020828403121561333657600080fd5b813561100d81612d74565b600080600080600060a0868803121561335957600080fd5b853561336481612d74565b9450602086013561337481612d74565b9350604086013567ffffffffffffffff8082111561339157600080fd5b61339d89838a01612e9a565b945060608801359150808211156133b357600080fd5b6133bf89838a01612e9a565b935060808801359150808211156131a257600080fd5b600080600080606085870312156133eb57600080fd5b84356133f681612d74565b935060208501359250604085013567ffffffffffffffff8111156131fe57600080fd5b6000806040838503121561342c57600080fd5b823561343781612d74565b946020939093013593505050565b600080600080600060a0868803121561345d57600080fd5b853561346881612d74565b9450602086013561347881612d74565b93506040860135925060608601359150608086013567ffffffffffffffff8111156134a257600080fd5b6131af88828901612c36565b8183823760009101908152919050565b600181811c908216806134d257607f821691505b60208210810361350b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60006020828403121561352357600080fd5b5051919050565b600081518084526020808501945080840160005b8381101561357057815173ffffffffffffffffffffffffffffffffffffffff168752958201959082019060010161353e565b509495945050505050565b600081518084526020808501945080840160005b838110156135705781518752958201959082019060010161358f565b600081518084526020808501808196508360051b8101915082860160005b858110156135f35782840389526135e1848351612cfd565b988501989350908401906001016135c9565b5091979650505050505050565b60a08152600061361360a083018861352a565b8281036020840152613625818861357b565b9050828103604084015261363981876135ab565b60608401959095525050608001529392505050565b60c08152600061366160c083018961352a565b8281036020840152613673818961357b565b9050828103604084015261368781886135ab565b60608401969096525050608081019290925260a0909101529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610875576108756136a6565b600181815b8085111561374157817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115613727576137276136a6565b8085161561373457918102915b93841c93908002906136ed565b509250929050565b60008261375857506001610875565b8161376557506000610875565b816001811461377b5760028114613785576137a1565b6001915050610875565b60ff841115613796576137966136a6565b50506001821b610875565b5060208310610133831016604e8410600b84101617156137c4575081810a610875565b6137ce83836136e8565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115613800576138006136a6565b029392505050565b600061100d8383613749565b8082028115828204841417610875576108756136a6565b60808152600061383e608083018761352a565b8281036020840152613850818761357b565b9050828103604084015261386481866135ab565b91505082606083015295945050505050565b84815260ff84166020820152826040820152608060608201526000610fdc6080830184612cfd565b85815260ff8516602082015283604082015260a0606082015260006138c660a0830185612cfd565b82810360808401526138d88185612cfd565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203613944576139446136a6565b5060010190565b60006020828403121561395d57600080fd5b8151801515811461100d57600080fd5b81810381811115610875576108756136a6565b67ffffffffffffffff8181168382160190808211156139a1576139a16136a6565b5092915050565b60006101208b8352602073ffffffffffffffffffffffffffffffffffffffff8c16818501528160408501526139df8285018c61352a565b915083820360608501526139f3828b61357b565b915083820360808501528189518084528284019150828160051b850101838c0160005b83811015613a62577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0878403018552613a50838351612cfd565b94860194925090850190600101613a16565b505086810360a0880152613a76818c6135ab565b945050505050613a9260c084018767ffffffffffffffff169052565b67ffffffffffffffff851660e0840152828103610100840152613ab58185612cfd565b9c9b50505050505050505050505056fe476f7665726e6f723a2072656c617920726576657274656420776974686f7574206d657373616765a264697066735822122038213209006d6a63c6e9c7408afba81812c24dfabb82e7f5244ca6e852ab402464736f6c63430008110033",
  },
};
