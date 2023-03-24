import { MarketService } from '@app/market/market.service';
import { MusicService } from '@app/music/music.service';
import { StealServiceService } from '@app/steal-address/steal-address.service';
import { TokenCreatorService } from '@app/token-creator/token-creator.service';
import { UserService } from '@app/user/user.service';
import { DaoService } from '@app/dao/dao.service';

class Singleton {
  private static tokenCreatorInstance: TokenCreatorService;
  private static userInstance: UserService;
  private static stealAddressInstance: StealServiceService;
  private static musicInstance: MusicService;
  private static marketInstance: MarketService;
  private static daoInstance: DaoService;

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

  public static getStealAddressInstance(): StealServiceService {
    if (!Singleton.stealAddressInstance) {
      Singleton.stealAddressInstance = new StealServiceService();
    }
    return Singleton.stealAddressInstance;
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
  public static getDaoInstance(): DaoService {
    if (!Singleton.daoInstance) {
      Singleton.daoInstance = new DaoService();
    }
    return Singleton.daoInstance;
  }
}

export { Singleton };
