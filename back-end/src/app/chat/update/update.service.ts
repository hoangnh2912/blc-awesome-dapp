import { Update } from '@schemas';

class UpdateService {
  public async updateFlag(isStartUpdate: boolean) {
    if (isStartUpdate) {
      await Update.findOneAndUpdate(
        {
          done_at: { $exists: false },
        },
        {
          created_at: new Date(),
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
    } else {
      await Update.findOneAndUpdate(
        {
          done_at: { $exists: false },
        },
        {
          done_at: new Date(),
        },
      );
    }
  }

  public async getFlag() {
    return await Update.findOne({
      done_at: { $exists: false },
    });
  }
}

export { UpdateService };
