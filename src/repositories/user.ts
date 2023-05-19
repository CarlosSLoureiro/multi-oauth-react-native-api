import { injectable } from 'inversify';

import User from '@models/user';
import type UserInterface from '@models/user.interface';

import type UserRepositoryInterface from './user.interface';

@injectable()

export default class UserRepository implements UserRepositoryInterface {
  public async create (userData: UserInterface): Promise<User> {
    return await User.create(userData);
  }

  public async findUserByEmail (email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }
}