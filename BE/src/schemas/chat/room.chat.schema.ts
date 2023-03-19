import mongoose, { Schema } from 'mongoose';
import { Constant } from '../constants';
import { IUserMessage } from './message.schema';

export interface IUserMessageRead {
  user: IUserMessage;
  message_id?: string;
  at?: Date;
  unread_count: number;
}

interface NftContract {
  chain_id: string;
  address: string;
  contract_name: string;
}
interface LastMessage {
  message_data: string;
  at: Date;
  shared_key?: string;
}

export interface IRoom {
  name: string;
  avatar?: string;
  description?: string;
  users: string[];
  hidden: string[];
  cid?: string;
  user_read: IUserMessageRead[];
  user_receive?: IUserMessageRead[];
  created_at: Date;
  creator: string;
  both_init?: boolean;
  only_view: boolean;
  admins: string[];
  sub_admins: string[];
  nft_contracts?: NftContract[];
  shared_key?: string;
  updated_at?: Date;
  deleted_at?: Date;
  room_type: string;
  last_message: LastMessage;
  is_disable: string[];
}

const roomSchema = new Schema<IRoom>({
  name: { required: false, type: String },
  avatar: { required: false, type: String },
  description: { required: false, type: String },
  cid: { required: false, type: String },
  users: { required: true, type: Schema.Types.Mixed, default: [] },
  user_read: { required: true, type: Schema.Types.Mixed, default: [] },
  user_receive: { required: true, type: Schema.Types.Mixed, default: [] },
  created_at: { required: true, type: Date, default: Date.now },
  creator: { required: true, type: String },
  both_init: { required: false, type: Boolean },
  only_view: { required: false, type: Boolean, default: false },
  hidden: { type: Schema.Types.Mixed, default: [] },
  admins: { required: true, type: Schema.Types.Mixed, default: [] },
  sub_admins: { required: true, type: Schema.Types.Mixed, default: [] },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
  last_message: { required: true, type: Schema.Types.Mixed, default: {} },
  nft_contracts: { required: true, type: Schema.Types.Mixed, default: [] },
  shared_key: { required: false, type: String },
  room_type: {
    required: true,
    type: String,
    enum: Object.values(Constant.ROOM_TYPE),
    default: Constant.ROOM_TYPE.PRIVATE,
  },
  is_disable: { required: true, type: Schema.Types.Mixed, default: [] },
});

export const Room = mongoose.model('Room', roomSchema, undefined, {
  overwriteModels: true,
});
