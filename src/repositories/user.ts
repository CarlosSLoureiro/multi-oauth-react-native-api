import { injectable } from 'inversify';

import User from '@models/user';
import type UserInterface from '@models/user.interface';

import SequelizeError from '@errors/sequelize.error';

import type UserRepositoryInterface from './user.interface';

@injectable()

export default class UserRepository implements UserRepositoryInterface {
  public async create (userData: UserInterface): Promise<User> {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new SequelizeError(error);
    }
  }

  public async findUserById (id: number): Promise<User | null> {
    try {
      return await User.findOne({ where: { id } });
    } catch (error) {
      throw new SequelizeError(error);
    }
  }

  public async findUserByEmail (email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new SequelizeError(error);
    }
  }
}
