import mongoose, { Schema } from 'mongoose';

export interface IPlaylist {
  name: string;
  description: string;
  audios: string[];
  image: string;
  owner: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const playlistSchema = new Schema<IPlaylist>({
  name: { required: true, type: String },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  owner: { type: String, default: '' },
  audios: { required: true, type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Playlist = mongoose.model('playlist', playlistSchema, undefined, {
  overwriteModels: true,
});
