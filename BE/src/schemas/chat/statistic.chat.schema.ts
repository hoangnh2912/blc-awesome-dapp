import mongoose, { Schema } from 'mongoose';

export interface IStatistic {
  total_reward: number;
  message_sent: number;
  claim_amount: number;
}

const statisticSchema = new Schema<IStatistic>({
  total_reward: { required: true, type: Number, default: 0 },
  message_sent: { required: true, type: Number, default: 0 },
  claim_amount: { required: true, type: Number, default: 0 },
});

export const Statistic = mongoose.model('Statistic', statisticSchema, undefined, {
  overwriteModels: true,
});
