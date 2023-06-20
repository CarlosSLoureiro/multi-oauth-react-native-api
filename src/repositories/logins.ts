import { injectable } from 'inversify';

import Logins from '@models/logins';
import type LoginsInterface from '@models/logins.interface';

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
}
