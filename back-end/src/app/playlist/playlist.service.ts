import { Playlist } from '@schemas';
import { PlaylistInput } from './playlist';

export class PlaylistService {
  public async getListPlaylist(address: string) {
    return await Playlist.find({
      owner: address,
    });
  }

  public async getPlaylistDetail(id: string) {
    return await Playlist.findOne({ _id: id });
  }

  public async updateOrCreatePlaylist(payload: PlaylistInput) {
    return await Playlist.findOneAndUpdate(
      {
        _id: payload.id,
      },
      (({ id, ...o }) => o)(payload),
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
  }
}
