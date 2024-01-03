import { Synchronize } from '@schemas';

export class SynchronizeService {
  async getSynchronize() {
    const lastSynchronize = await Synchronize.findOne(undefined, undefined, {
      sort: { last_block_number: -1 },
    });
    if (!lastSynchronize) {
      return await this._initSynchronize();
    }
    return lastSynchronize;
  }

  private async _initSynchronize() {
    const createSync = await Synchronize.create({
      last_block_number: 0,
    });
    return createSync;
  }
}
