import { MarketService } from '@app/market/market.service';
import { MusicService } from '@app/music/music.service';
import { StealServiceService } from '@app/steal-address/steal-address.service';
import { TokenCreatorService } from '@app/token-creator/token-creator.service';
import { UserService } from '@app/user/user.service';
import { ChatUserService } from '@app/chat/user/user.service';
import { MessageService } from '@app/chat/message/message.service';
import { PublicLimitedMessageService } from '@app/chat/message.public.limited/message.public.limited.service';
import { PublicUnlimitedMessageService } from '@app/chat/message.public.unlimited/message.public.unlimited.service';
import { NotificationService } from '@app/chat/notification/notification.service';
import { RoomService } from '@app/chat/room/room.service';
import { StickerService } from '@app/chat/sticker/sticker.service';
import { SharedKeyService } from '@app/chat/shared.key/shared.key.service';

class Singleton {
  private static tokenCreatorInstance: TokenCreatorService;
  private static userInstance: UserService;
  private static chatUserInstance: ChatUserService;
  private static stealAddressInstance: StealServiceService;
  private static musicInstance: MusicService;
  private static marketInstance: MarketService;
  private static messageInstance: MessageService;
  private static publicUnlimitedMessageInstance: PublicUnlimitedMessageService;
  private static publicLimitedMessageInstance: PublicLimitedMessageService;
  private static notificationInstance: NotificationService;
  private static roomInstance: RoomService;
  private static stickerInstance: StickerService;
  private static sharedKeyInstance: SharedKeyService;

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

  public static getChatUserInstance(): ChatUserService {
    if (!Singleton.chatUserInstance) {
      Singleton.chatUserInstance = new ChatUserService();
    }
    return Singleton.chatUserInstance;
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
  public static getMessageInstance(): MessageService {
    if (!Singleton.messageInstance) {
      Singleton.messageInstance = new MessageService();
    }
    return Singleton.messageInstance;
  }
  public static getPublicUnlimitedRoomInstance(): PublicUnlimitedMessageService {
    if (!Singleton.publicUnlimitedMessageInstance) {
      Singleton.publicUnlimitedMessageInstance = new PublicUnlimitedMessageService();
    }
    return Singleton.publicUnlimitedMessageInstance;
  }
  public static getPublicLimitedRoomInstance(): PublicLimitedMessageService {
    if (!Singleton.publicLimitedMessageInstance) {
      Singleton.publicLimitedMessageInstance = new PublicLimitedMessageService();
    }
    return Singleton.publicLimitedMessageInstance;
  }
  public static getStickerInstance(): StickerService {
    if (!Singleton.stickerInstance) {
      Singleton.stickerInstance = new StickerService();
    }
    return Singleton.stickerInstance;
  }
  public static getSharedKeyInstance(): SharedKeyService {
    if (!Singleton.sharedKeyInstance) {
      Singleton.sharedKeyInstance = new SharedKeyService();
    }
    return Singleton.sharedKeyInstance;
  }
  public static getRoomInstance(): RoomService {
    if (!Singleton.roomInstance) {
      Singleton.roomInstance = new RoomService();
    }
    return Singleton.roomInstance;
  }
  public static getNotificationInstance(): NotificationService {
    if (!Singleton.notificationInstance) {
      Singleton.notificationInstance = new NotificationService();
    }
    return Singleton.notificationInstance;
  }
}

export { Singleton };
