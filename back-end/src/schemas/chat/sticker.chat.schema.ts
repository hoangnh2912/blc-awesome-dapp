import mongoose, { Schema } from 'mongoose';

export interface ISticker {
  id_token: string;
  name?: string;
  description?: string;
  images: string[];
  created_at?: Date;
  updated_at?: Date;
  owner?: string;
  cid?: string;
}

const stickerSchema = new Schema<ISticker>({
  id_token: { required: true, type: String, unique: true },
  name: { required: false, type: String },
  description: { required: false, type: String },
  images: { required: true, type: Schema.Types.Mixed, default: [] },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
  owner: { required: false, type: String },
  cid: { required: false, type: String },
});

export const Sticker = mongoose.model('Sticker', stickerSchema, undefined, {
  overwriteModels: true,
});
