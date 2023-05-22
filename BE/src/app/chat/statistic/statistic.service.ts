// import { Constant } from '@constants';
import { logger, Some } from '@constants';
import { IStatistic, Statistic } from '@schemas';
class StatisticService {
  public async getStatistic(): Promise<Some<IStatistic>> {
    try {
      const findStatistic = await Statistic.findOne({}).limit(1).sort({ _id: 1 });
      if (!findStatistic) {
        return {
          status: false,
          message: 'STATISTIC: Empty result',
        };
      }
      const returnValues = {
        total_reward: {
          value: findStatistic.total_reward,
          percent: 0,
        },
      };
      return {
        status: true,
        data: findStatistic,
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
export { StatisticService };
