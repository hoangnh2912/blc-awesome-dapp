import { Playlist } from '@schemas';
import { PlaylistInput } from './playlist';
import { ObjectId } from 'mongodb';

export class PlaylistService {
  public async getListPlaylist(address: string) {
    return await Playlist.aggregate([
      {
        $match: {
          owner: address,
        },
      },
      {
        $lookup: {
          from: 'markets',
          localField: 'audios',
          foreignField: 'id',
          as: 'audios',
        },
      },
    ]);
  }

  public async getPlaylistDetail(id: string) {
    const playlist = await Playlist.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'markets',
          localField: 'audios',
          foreignField: 'id',
          as: 'audios',
        },
      },
    ]);
    if (playlist.length > 0) {
      return playlist[0];
    }
    return null;
  }

  public async updateOrCreatePlaylist(payload: PlaylistInput) {
    return payload.id
      ? await Playlist.findOneAndUpdate(
          {
            _id: payload.id,
          },
          (({ id, ...o }) => o)(payload),
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          },
        )
      : await Playlist.create((({ id, ...o }) => o)(payload));
  }

  public async deletePlaylist(id: string, address: string) {
    return await Playlist.deleteOne({
      _id: new ObjectId(id),
      owner: address,
    });
  }
}
