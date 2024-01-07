import mongoose, { Schema } from 'mongoose';

export interface ICid {
  cid: string;
  room_id: string;
  created_at?: Date;
  updated_at?: Date;
}

const cidSchema = new Schema<ICid>({
  cid: { required: true, type: String },
  room_id: { required: true, type: String },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
});

export const Cid = mongoose.model('Cid', cidSchema, undefined, {
  overwriteModels: true,
});
