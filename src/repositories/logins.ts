import { injectable } from 'inversify';

import Logins from '@models/logins';
import type LoginsInterface from '@models/logins.interface';
import User from '@models/user';

import SequelizeError from '@errors/sequelize.error';

import type LoginsRepositoryInterface from './logins.interface';

@injectable()

export default class LoginsRepository implements LoginsRepositoryInterface {
  public async create (loginData: Omit<LoginsInterface, "id">): Promise<Logins> {
    try {
      return await Logins.create(loginData);
    } catch (error) {
      throw new SequelizeError(error);
    }
  }

  public async findManyByPage (page: number): Promise<Array<Logins>> {
    try {
      const limit = 10;
      const offset = page * limit;
      return await Logins.findAll({
        order: [[`id`, `DESC`]],
        limit,
        offset,
        include: [{ model: User, required: true }]
      });
    } catch (error) {
      throw new SequelizeError(error);
    }
  }
}
