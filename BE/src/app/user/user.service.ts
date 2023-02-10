import { User } from '@schemas';
import { CreateUserInput } from './user';

export class UserService {
  async createUser({ wallet_address }: CreateUserInput) {
    return await User.create({ wallet_address });
  }
}
