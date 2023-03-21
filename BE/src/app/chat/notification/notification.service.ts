import { INotification, Notification } from '@chat-schemas';
import { ChatConstant, logger } from '@constants';
export class NotificationService {
  public async getList(address: string, page: number, numberPerPage: number, type: string = '') {
    const typeNames = Object.values(ChatConstant.NOTIFICATION_TAB_TYPE);
    const count = await this.getTotalNotificationCount(address, type);

    if (!typeNames.includes(type)) {
      return {
        count,
        notifications: await Notification.find({
          to_address: address,
        })
          .sort({ created_at: -1 })
          .skip(page * numberPerPage)
          .limit(numberPerPage),
      };
    }
    const notifications = await Notification.find({
      to_address: address,
      'data.type': { $regex: type },
    })
      .sort({ created_at: -1 })
      .skip(page * numberPerPage)
      .limit(numberPerPage);

    // const returnArr: any[] = [];

    // typeNames.map((type) => {
    //   returnArr.push({
    //     type,
    //     notifications: notifications.filter((notification) =>
    //       notification.data.type.includes(type)
    //     ),
    //   });
    // });

    return { count, notifications };
  }

  public async getTotalNotificationCount(address: string, _type: string = '') {
    try {
      // const typeNames = Object.values(Constant.NOTIFICATION_TAB_TYPE);
      // if (type && !typeNames.includes(type)) {
      //   return 0;
      // }
      const notifications = await Notification.countDocuments({
        to_address: address,
        is_read: false,
        'data.type': { $regex: ChatConstant.NOTIFICATION_TAB_TYPE.FRIEND },
      });
      return notifications;
    } catch (error: any) {
      logger.error(error.message);
      return 0;
    }
  }

  public async readNotification(
    address: string,
    notification_id: string,
  ): Promise<INotification | undefined> {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: notification_id,
        to_address: address,
      },
      {
        is_read: true,
      },
    );
    return notification?.toObject();
  }
  public async readAllNotification(address: string): Promise<boolean> {
    await Notification.updateMany(
      {
        to_address: address,
      },
      {
        is_read: true,
      },
    );
    return true;
  }
}
