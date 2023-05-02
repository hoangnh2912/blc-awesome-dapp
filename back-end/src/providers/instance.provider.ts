import { MarketService } from '@app/market/market.service';
import { MusicService } from '@app/music/music.service';
import { StealthServiceService } from '@app/stealth-address/stealth-address.service';
import { TokenCreatorService } from '@app/token-creator/token-creator.service';
import { UserService } from '@app/user/user.service';
import { RentingService } from '@app/renting/renting.service';
import { PlaylistService } from '@app/playlist/playlist.service';

class Singleton {
  private static tokenCreatorInstance: TokenCreatorService;
  private static userInstance: UserService;
  private static stealthAddressInstance: StealthServiceService;
  private static musicInstance: MusicService;
  private static marketInstance: MarketService;
  private static rentingInstance: RentingService;
  private static playlistInstance: PlaylistService;

  private constructor() {}

  public static getTokenCreatorInstance(): TokenCreatorService {
    if (!Singleton.tokenCreatorInstance) {
      Singleton.tokenCreatorInstance = new TokenCreatorService();
    }
    return Singleton.tokenCreatorInstance;
  }

  public static getUserInstance(): UserService {
    if (!Singleton.userInstance) {
      Singleton.userInstance = new UserService();
    }
    return Singleton.userInstance;
  }

  public static getStealthAddressInstance(): StealthServiceService {
    if (!Singleton.stealthAddressInstance) {
      Singleton.stealthAddressInstance = new StealthServiceService();
    }
    return Singleton.stealthAddressInstance;
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
  public static getRentingInstance(): RentingService {
    if (!Singleton.rentingInstance) {
      Singleton.rentingInstance = new RentingService();
    }
    return Singleton.rentingInstance;
  }
  public static getPlaylistInstance(): PlaylistService {
    if (!Singleton.playlistInstance) {
      Singleton.playlistInstance = new PlaylistService();
    }
    return Singleton.playlistInstance;
  }
}

export { Singleton };
