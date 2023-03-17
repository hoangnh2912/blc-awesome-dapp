import mongoose, { Schema } from 'mongoose';

export interface IMarket {
  name: string;
  amount: string;
  price: string;
  description: string;
  id: string;
  left: string;
  audio: string;
  image: string;
  singer: string;
  seller: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  duration: number;
  bitrate: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const marketSchema = new Schema<IMarket>({
  name: { required: true, type: String },
  amount: { required: true, type: String },
  price: { required: true, type: String },
  description: { type: String, default: '' },
  id: { required: true, type: String },
  left: { required: true, type: String },
  audio: { required: true, type: String },
  image: { required: true, type: String },
  singer: { required: true, type: String },
  seller: { required: true, type: String },
  duration: { required: true, type: Number },
  bitrate: { required: true, type: Number },
  attributes: { required: true, type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Market = mongoose.model('market', marketSchema, undefined, {
  overwriteModels: true,
});
