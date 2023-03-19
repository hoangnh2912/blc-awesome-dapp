import mongoose, { Schema } from 'mongoose';

export interface IBuy {
  id_token: string;
  txHash: string;
  buyer: string;
  created_at?: Date;
  updated_at?: Date;
}

const buySchema = new Schema<IBuy>({
  id_token: { required: true, type: String },
  txHash: { required: false, type: String },
  buyer: { required: false, type: String },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
});

export const Buy = mongoose.model('Buy', buySchema, undefined, {
  overwriteModels: true,
});
