import { Constant } from '@constants';
import mongoose, { Schema } from 'mongoose';

export interface IAvatar {
  wallet_address: string;
  cid: string;
  created_at?: Date;
  updated_at?: Date;
}

const avatarSchema = new Schema<IAvatar>({
  wallet_address: { required: true, type: String },
  cid: { required: false, type: String, default: Constant.DEFAULT_AVATAR.split('cid=').pop() },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
});

export const Avatar = mongoose.model('Avatar', avatarSchema, undefined, {
  overwriteModels: true,
});
