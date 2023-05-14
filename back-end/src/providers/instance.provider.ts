import { MarketService } from '@app/market/market.service';
import { MusicService } from '@app/music/music.service';
import { UserService } from '@app/user/user.service';
import { PlaylistService } from '@app/playlist/playlist.service';

class Singleton {
  private static userInstance: UserService;
  private static musicInstance: MusicService;
  private static marketInstance: MarketService;
  private static playlistInstance: PlaylistService;

  private constructor() {}

  public static getUserInstance(): UserService {
    if (!Singleton.userInstance) {
      Singleton.userInstance = new UserService();
    }
    return Singleton.userInstance;
  }

  public static getMusicInstance(): MusicService {
    if (!Singleton.musicInstance) {
      Singleton.musicInstance = new MusicService();
    }
    return Singleton.musicInstance;
  }
  public static getMarketInstance(): MarketService {
    if (!Singleton.marketInstance) {
      Singleton.marketInstance = new MarketService();
    }
    return Singleton.marketInstance;
  }

  public static getPlaylistInstance(): PlaylistService {
    if (!Singleton.playlistInstance) {
      Singleton.playlistInstance = new PlaylistService();
    }
    return Singleton.playlistInstance;
  }
}

export { Singleton };
