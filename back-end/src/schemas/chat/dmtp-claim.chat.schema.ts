import mongoose, { Schema } from 'mongoose';

export interface IDmtpClaim {
  claim_user_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const dmtpClaimSchema = new Schema<IDmtpClaim>({
  claim_user_id: { required: true, type: String },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const DmtpClaim = mongoose.model('DmtpClaim', dmtpClaimSchema, undefined, {
  overwriteModels: true,
});
