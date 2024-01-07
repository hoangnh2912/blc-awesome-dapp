import mongoose, { Schema } from 'mongoose';

export interface IUpdate {
  created_at: Date;
  done_at?: Date;
}

const updateSchema = new Schema<IUpdate>({
  created_at: { required: false, type: Date, default: Date.now },
  done_at: { required: false, type: Date },
});

export const Update = mongoose.model('Update', updateSchema, undefined, {
  overwriteModels: true,
});
