import mongoose, { Schema } from 'mongoose';

interface IDiscord {
  id: string;
  discriminator: string;
  refresh_token: string;
  username: string;
  is_in_discord_server: boolean;
}

export interface ChatSession {
  session_id: string;
  address: string;
}

export interface ChatUserBalance {
  dmtp: string;
  stdmtp: string;
  matic: string;
}

export interface IChatUser {
  discord?: IDiscord;
  telegram?: string;
  authorized_id?: string;
  name?: string;
  avatar?: string;
  description?: string;
  dmtp: string;
  wallet_address: string;
  stickers: string[];
  friends: string[];
  friend_requests?: string[];
  session: ChatSession[];
  active_points: number;
  wallet_score: number;
  campaign?: string;
  is_stake_eth: boolean;
  pub_key?: string;
  priv_key?: string;
  cid_key_pair?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const chatUserSchema = new Schema<IChatUser>({
  discord: { required: false, type: Schema.Types.Mixed },
  telegram: { required: false, type: String },
  authorized_id: { required: false, type: String },
  stickers: { required: false, type: Schema.Types.Mixed, default: [] },
  friends: { required: false, type: Schema.Types.Mixed, default: [] },
  friend_requests: { required: false, type: Schema.Types.Mixed, default: [] },
  wallet_address: { type: String, required: true, unique: true },
  name: { required: false, type: String },
  description: { required: false, type: String, default: '' },
  dmtp: { required: false, type: String, default: '0' },
  session: { required: true, type: Schema.Types.Mixed, default: [] },
  active_points: { required: false, type: Number, default: 0 },
  wallet_score: { required: false, type: Number, default: 0 },
  campaign: { required: false, type: String },
  is_stake_eth: { required: false, type: Boolean, default: false },
  avatar: { required: false, type: String },
  pub_key: { required: false, type: String },
  priv_key: { required: false, type: String },
  cid_key_pair: { required: false, type: String },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const ChatUser = mongoose.model('ChatUser', chatUserSchema, undefined, {
  overwriteModels: true,
});
