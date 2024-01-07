import mongoose, { Schema } from 'mongoose';

export interface IAuthorized {
  wallet_addresses: string[];
  invited_wallets: string[];
  stickers: string[];
  claimable_token: number;
  user_score: number;
  total_activity_points: number;
  invitation_point: number;
  authorization_count: number;
  is_locked_eth: boolean;
  is_group_created: boolean;
  invitation_url?: string;
  discord?: string;
  otp: string;
  telegram_id: string;
  api_key?: string;
  email?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const authorizedSchema = new Schema<IAuthorized>({
  wallet_addresses: { required: false, type: Schema.Types.Mixed, default: [] },
  invited_wallets: { required: false, type: Schema.Types.Mixed, default: [] },
  stickers: { required: false, type: Schema.Types.Mixed, default: [] },
  claimable_token: { required: false, type: Number, default: 0 },
  invitation_point: { required: false, type: Number, default: 0 },
  user_score: { required: false, type: Number, default: 0 },
  total_activity_points: { required: false, type: Number, default: 0 },
  authorization_count: { required: false, type: Number, default: 1 },
  invitation_url: { required: false, type: String },
  discord: { required: false, type: String },
  otp: { required: false, type: String, default: '' },
  telegram_id: { required: true, type: String, unique: true },
  api_key: { required: false, type: String },
  email: { required: false, type: String },
  is_locked_eth: { required: false, type: Boolean, default: false },
  is_group_created: { required: false, type: Boolean, default: false },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Authorized = mongoose.model('Authorized', authorizedSchema, undefined, {
  overwriteModels: true,
});
