import mongoose, { Schema } from 'mongoose';

export enum IStickerPriceType {
  None,
  Fixed,
  Free,
}

export interface Token {
  contract_address: string;
  symbol: string;
  decimals: number;
  name: string;
  logo: string;
}

export interface IChatMarket {
  id_token: string;
  name?: string;
  description?: string;
  images: string[];
  amount: string;
  amount_left: string;
  price_type?: IStickerPriceType;
  price?: string;
  token?: Token;
  whitelist?: string[];
  created_at?: Date;
  updated_at?: Date;
  cid?: string;
}

const chatMarketSchema = new Schema<IChatMarket>({
  id_token: { required: true, type: String, unique: true },
  name: { required: false, type: String },
  description: { required: false, type: String },
  images: { required: true, type: Schema.Types.Mixed, default: [] },
  amount: { required: true, type: String },
  amount_left: { required: true, type: String },
  price: { required: false, type: String },
  token: { required: false, type: Schema.Types.Mixed },
  price_type: { required: false, type: Number },
  whitelist: { required: false, type: Schema.Types.Mixed, default: [] },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
  cid: { required: false, type: String },
});

export const ChatMarket = mongoose.model('ChatMarket', chatMarketSchema, undefined, {
  overwriteModels: true,
});
