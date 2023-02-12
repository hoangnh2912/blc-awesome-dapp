import mongoose, { Schema } from 'mongoose';
export interface IUser {
  contract_address: string;
  owner_address: string;
  abi: any;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const contractSchema = new Schema<IUser>({
  contract_address: { type: String, required: true, unique: true },
  owner_address: { type: String, required: true },
  abi: { type: Schema.Types.Mixed, required: true },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Contract = mongoose.model('contract', contractSchema, undefined, {
  overwriteModels: true,
});
