import mongoose, { Schema } from 'mongoose';

export interface INotification {
  content?: string;
  to_address: string;
  is_read: boolean;
  data: any;
  created_at?: Date;
  updated_at?: Date;
}

const notificationSchema = new Schema<INotification>({
  content: { required: false, type: String, default: '' },
  to_address: { required: true, type: String },
  is_read: { required: false, type: Boolean, default: false },
  data: { required: false, type: Schema.Types.Mixed },
  updated_at: { required: false, type: Date },
  created_at: { required: false, type: Date, default: Date.now },
});

export const Notification = mongoose.model('Notification', notificationSchema, undefined, {
  overwriteModels: true,
});
