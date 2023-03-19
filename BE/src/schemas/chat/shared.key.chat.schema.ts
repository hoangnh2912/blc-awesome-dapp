import mongoose, { Schema } from 'mongoose';

export interface ISharedKey {
  key_data: string;
  room_id: string;
  created_at: Date;
  deleted_at?: Date;
}

const sharedKeySchema = new Schema<ISharedKey>({
  key_data: { required: true, type: String },
  room_id: { required: true, type: String },
  created_at: { required: true, type: Date, default: Date.now },
  deleted_at: { required: false, type: Date },
});

export const SharedKey = mongoose.model('SharedKey', sharedKeySchema, undefined, {
  overwriteModels: true,
});
