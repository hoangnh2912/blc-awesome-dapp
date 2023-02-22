import mongoose, { Schema } from 'mongoose';

export interface IUser {
  wallet_address: string;
  private_key: string;
  steal_address: {
    address: string;
    from: string;
  }[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const userSchema = new Schema<IUser>({
  wallet_address: { type: String, required: true, unique: true },
  private_key: { type: String, required: true, unique: true },
  steal_address: { type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const User = mongoose.model('user', userSchema, undefined, {
  overwriteModels: true,
});
