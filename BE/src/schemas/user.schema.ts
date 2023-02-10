import mongoose, { Schema } from 'mongoose';

export interface IUser {
  wallet_address: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const userSchema = new Schema<IUser>({
  wallet_address: { type: String, required: true, unique: true },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const User = mongoose.model('User', userSchema, undefined, {
  overwriteModels: true,
});
