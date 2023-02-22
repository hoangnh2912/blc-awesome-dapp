import { StealServiceService } from '@app/steal-address/steal-address.service';
import { TokenCreatorService } from '@app/token-creator/token-creator.service';
import { UserService } from '@app/user/user.service';

class Singleton {
  private static tokenCreatorInstance: TokenCreatorService;
  private static userInstance: UserService;
  private static stealAddressInstance: StealServiceService;

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
}

export { Singleton };
