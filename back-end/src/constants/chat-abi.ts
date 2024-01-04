export const ABI_CHAT = {
  ChatMarket: {
    address: '',
    abi: [],
    contractName: 'ChatMarket',
    input: [],
    path: 'chat',
  },
  Sticker: {
    address: '',
    abi: [],
    contractName: 'ChatMarket',
    input: [],
    path: 'chat',
  },
  CID: {
    address: '0xBbE87a8Bb35Cb3642Be7c663c5e75Fba8aBa10bF',
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
        ],
        name: 'AddCid',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
        ],
        name: 'AddKey',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '_user', type: 'address' },
          { internalType: 'string', name: '_cid', type: 'string' },
        ],
        name: 'addKey',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'string', name: '_cid', type: 'string' }],
        name: 'storeCID',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
        name: 'getKeys',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getCids',
        outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'getCid',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    contractName: 'DMTPCid',
  },
  CMD: {
    address: '0xF128e3D400cf8F8B422E65989bC03Fc2f78E3884',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'blockUser',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'chatMind',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'BlockUser',
        type: 'event',
      },
      {
        inputs: [],
        name: 'claimReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'ClaimReward',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'activePoints',
            type: 'uint256[]',
          },
        ],
        name: 'increaseBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newAdmin',
            type: 'address',
          },
        ],
        name: 'setNewAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'totalReward',
            type: 'uint256',
          },
        ],
        name: 'setTotalReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'unblockUser',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'UnblockUser',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'points',
            type: 'uint256[]',
          },
        ],
        name: 'UpdateActivePoints',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        name: 'UpdateActiveReward',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
        ],
        name: 'UpdateAdmin',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'totalReward',
            type: 'uint256',
          },
        ],
        name: 'UpdateTotalReward',
        type: 'event',
      },
      {
        inputs: [],
        name: 'balanceOfPool',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getActivePoints',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getActiveReward',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'isBlocked',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    contractName: 'ChatMindReward',
  },
  CMDERC20: {
    address: '0x93b242539b6652163d72ecd20b347a965e6280a2',
    abi: [
      {
        inputs: [
          { internalType: 'address', name: 'chatMind', type: 'address' },
          { internalType: 'address', name: 'admin', type: 'address' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, internalType: 'address', name: 'account', type: 'address' }],
        name: 'BlockUser',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'account', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'ClaimReward',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, internalType: 'address', name: 'account', type: 'address' }],
        name: 'UnblockUser',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address[]', name: 'accounts', type: 'address[]' },
          { indexed: false, internalType: 'uint256[]', name: 'points', type: 'uint256[]' },
        ],
        name: 'UpdateActivePoints',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address[]', name: 'accounts', type: 'address[]' },
          { indexed: false, internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        ],
        name: 'UpdateActiveReward',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, internalType: 'address', name: 'admin', type: 'address' }],
        name: 'UpdateAdmin',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, internalType: 'uint256', name: 'totalReward', type: 'uint256' }],
        name: 'UpdateTotalReward',
        type: 'event',
      },
      {
        inputs: [],
        name: 'balanceOfPool',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'blockUser',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'getActivePoints',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'getActiveReward',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address[]', name: 'accounts', type: 'address[]' },
          { internalType: 'uint256[]', name: 'activePoints', type: 'uint256[]' },
        ],
        name: 'increaseBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'isBlocked',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'newAdmin', type: 'address' }],
        name: 'setNewAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'totalReward', type: 'uint256' }],
        name: 'setTotalReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'unblockUser',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    contractName: 'CMD',
  },
};
