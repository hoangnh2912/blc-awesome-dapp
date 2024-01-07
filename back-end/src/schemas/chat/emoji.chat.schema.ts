import mongoose, { Schema } from 'mongoose';

export interface IEmoji {
  name: string;
  image: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const emojiSchema = new Schema<IEmoji>({
  name: { required: true, type: String },
  image: { required: true, type: String },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Emoji = mongoose.model('Emoji', emojiSchema, undefined, {
  overwriteModels: true,
});
