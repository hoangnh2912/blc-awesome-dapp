import mongoose, { Schema } from 'mongoose';
import { ChatConstant } from '@constants';
import { ISticker, IChatUser } from '.';

export type IUserMessage = Pick<IChatUser, 'wallet_address'>;
export type IStickerMessage = Pick<ISticker, 'id_token' | 'name'> & {
  image: string;
};

export type IReaction = {
  emoji: string;
  users: IUserMessage[];
  at: Date;
};

export interface IMessage {
  room_id: string;
  sender_user: IUserMessage;
  message_data: string;
  reaction: IReaction[];
  is_forwarded: boolean;
  message_reply?: string;
  cid?: string;
  message_status: string;
  shared_key?: string;
  is_promotion: boolean;
  is_notification?: boolean;
  created_at: Date;
  updated_at?: Date;
  synced_at?: Date;
  deleted_at?: Date;
}

const messageSchema = new Schema<IMessage>({
  room_id: { required: true, type: String },
  sender_user: { required: false, type: Schema.Types.Mixed },
  message_data: { required: true, type: String },
  cid: { required: false, type: String },
  reaction: { required: true, type: Schema.Types.Mixed, default: [] },
  is_forwarded: { required: true, type: Boolean, default: false },
  message_reply: { required: false, type: String },
  is_promotion: { required: true, type: Boolean, default: false },
  shared_key: { required: false, type: String },
  created_at: { required: true, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  synced_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
  message_status: {
    required: false,
    type: String,
    enum: Object.values(ChatConstant.MESSAGE_STATUS),
    default: ChatConstant.MESSAGE_STATUS.SENT,
  },
  is_notification: { required: true, type: Boolean, default: false },
});

export const Message = mongoose.model('Message', messageSchema, undefined, {
  overwriteModels: true,
});
