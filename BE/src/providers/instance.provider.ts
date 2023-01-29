import { TokenCreatorService } from '@app/token-creator/token-creator.service';

class Singleton {
  private static tokenCreatorInstance: TokenCreatorService;

  private constructor() {}

  public static getTokenCreatorInstance(): TokenCreatorService {
    if (!Singleton.tokenCreatorInstance) {
      Singleton.tokenCreatorInstance = new TokenCreatorService();
    }
    return Singleton.tokenCreatorInstance;
  }
}

export { Singleton };
