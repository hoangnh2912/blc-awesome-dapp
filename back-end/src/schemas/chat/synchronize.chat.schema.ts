import mongoose, { Schema } from 'mongoose';

export interface IChatSynchronize {
  last_block_number: number;
  transactions?: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const chatSynchronizeSchema = new Schema<IChatSynchronize>({
  last_block_number: { required: true, type: Number, unique: true },
  transactions: { required: false, type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const ChatSynchronize = mongoose.model('ChatSynchronize', chatSynchronizeSchema, undefined, {
  overwriteModels: true,
});
