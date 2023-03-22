import CONFIG_CONTRACT from '../../config.json';
import KEY_PAIR from '@config/chat/key_pair.json';

const NOTIFICATION_TYPE = {
  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FRIEND_ACCEPT: 'FRIEND_ACCEPT',
  FRIEND_DENY: 'FRIEND_DENY',
  NEW_MESSAGE: 'NEW_MESSAGE',
};

const MEMBER_OF_ROOM_TYPE = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
};

const ROOM_TYPE = {
  PRIVATE: 'PRIVATE',
  UNLIMITED: 'UNLIMITED',
  LIMITED: 'LIMITED',
};

const MESSAGE_STATUS = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  READ: 'READ',
};

const NOTIFICATION_TAB_TYPE = {
  FRIEND: 'FRIEND',
  NEW_MESSAGE: 'NEW_MESSAGE',
};

const TOKEN_ERC20 = {
  SMT: {
    contract_address: CONFIG_CONTRACT.SMT.address,
    decimals: 18,
    symbol: 'SMT',
    name: 'SMT',
    logo: 'https://cdn.discordapp.com/icons/1014855573747015700/7b2bf5ac7c063f1cc14712c245ae8384.webp?size=1024',
  },
  WETH: {
    contract_address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    logo: 'https://dappimg.com/media/image/token/a412fe82bd2c11eb8d1e0242ac130005.png',
  },
  NONE: {
    contract_address: '0x0000000000000000000000000000000000000000',
    decimals: 0,
    symbol: '',
    name: '',
    logo: '',
  },
};

enum FRIEND_STATUS {
  NONE = 0,
  SENDER_WAIT = 1,
  ACCEPTED = 2,
  RECEIVER_WAIT = 3,
}

const SOCKET_EVENT_NAME = {
  totalUnreadCount: 'total unread',
  friendRequest: 'friend request',
  friendAccept: 'friend accept',
  unfriend: 'unfriend',
  notification: 'notification',
  roomCreate: 'room create',
  friendRequestDeleted: 'friend request deleted',
  reactionAdded: 'reaction added',
  reactionRemoved: 'reaction removed',
  messageSent: 'message sent',
  messageDeleted: 'message deleted',
  messageUpdated: 'message updated',
  messageStatus: 'message status',
  userJoined: 'user joined',
  userLeave: 'user left',
  userRole: 'user set role',
  roomUpdated: 'room updated',
  groupCreated: 'room create group',
  userConnected: 'user connected',
  userDisconnected: 'user disconnected',
  balanceUpdate: 'balance update',
  sns: 'sns',
};

const ChatConstant = {
  ROOM_TYPE,
  MESSAGE_STATUS,
  NOTIFICATION_TAB_TYPE,
  TOKEN_ERC20,
  MEMBER_OF_ROOM_TYPE,
  KEY_PAIR,
  DEFAULT_AVATAR:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  NOTIFICATION_TYPE,
  RANDOM_COMPLEXITY: 10000000,
  FRIEND_STATUS,
  CONFIG_CONTRACT,
  SOCKET_EVENT_NAME,
  SOCKET_RESPONSE_TIMEOUT: 5000,
};
export { ChatConstant };
