// import { Constant, logger, uuid } from '@constants';
// import { AxiosGet, compile, verify } from '@providers';
// import fs from 'fs';
import { TimelockControllerInput } from './dao';
import { TokenCreatorService } from '@app/token-creator/token-creator.service';
// import { logger } from '@constants';

export class DaoService {
  tokenCreatorService = new TokenCreatorService();

  async createTimelock({ name, min_delay, proposers, executors, admin }: TimelockControllerInput) {
    return { name, min_delay, proposers, executors, admin };
  }
}
