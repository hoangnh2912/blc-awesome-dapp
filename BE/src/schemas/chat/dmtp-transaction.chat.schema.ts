import mongoose, { Schema } from 'mongoose';

type TransactionType = 'active' | 'invitation';

export interface IDmtpTransaction {
  grant_user_id: string;
  type: TransactionType;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const dmtpTransactionSchema = new Schema<IDmtpTransaction>({
  grant_user_id: { required: true, type: String },
  type: { required: true, type: String },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const DmtpTransaction = mongoose.model('DmtpTransaction', dmtpTransactionSchema, undefined, {
  overwriteModels: true,
});
