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
  history: {
    from: string;
    to: string;
    created_at: Date;
    transaction_hash: string;
    event: string;
  }[];
  duration: number;
  bitrate: number;
  search_key: string;
  play_count: number;
  view_count: number;
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
  play_count: { required: false, type: Number, default: 0 },
  view_count: { required: false, type: Number, default: 0 },
  bitrate: { required: true, type: Number },
  search_key: { required: true, type: String },
  attributes: { required: true, type: Schema.Types.Mixed, default: [] },
  history: { required: true, type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Market = mongoose.model('market', marketSchema, undefined, {
  overwriteModels: true,
});
