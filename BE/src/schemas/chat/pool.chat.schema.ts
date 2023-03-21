import mongoose, { Schema } from 'mongoose';
import { IStickerPriceType, Token } from './market.chat.schema';

export interface IPool {
  name?: string;
  description?: string;
  images: string[];
  amount: number;
  price_type?: IStickerPriceType;
  price?: string;
  token?: Token;
  whitelist?: string[];
  created_at?: Date;
  updated_at?: Date;
  cid?: string;
}

const poolSchema = new Schema<IPool>({
  name: { required: false, type: String },
  description: { required: false, type: String },
  images: { required: true, type: Schema.Types.Mixed, default: [] },
  amount: { required: true, type: Number, default: 0 },
  price: { required: false, type: String },
  price_type: { required: false, type: Number },
  token: { required: false, type: Schema.Types.Mixed },
  whitelist: { required: false, type: Schema.Types.Mixed, default: [] },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
  cid: { required: false, type: String },
});

export const Pool = mongoose.model('Pool', poolSchema, undefined, {
  overwriteModels: true,
});
