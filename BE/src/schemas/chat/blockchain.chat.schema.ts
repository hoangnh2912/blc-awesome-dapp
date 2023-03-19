import mongoose, { Schema } from 'mongoose';

export interface IBlockchain {
  block_number: string;
  is_stored: boolean;
  messages?: string[];
  cost?: string;
  stored_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const blockchainSchema = new Schema<IBlockchain>({
  block_number: { required: true, type: String, unique: true },
  is_stored: { required: true, type: Boolean, default: false },
  messages: { required: false, type: Schema.Types.Array, default: [] },
  cost: { required: false, type: String },
  stored_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Blockchain = mongoose.model('Blockchain', blockchainSchema, undefined, {
  overwriteModels: true,
});
