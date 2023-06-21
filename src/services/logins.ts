import { inject, injectable } from 'inversify';

import LoginsRepository from '@repository/logins';
import LoginsRepositoryInterface from '@repository/logins.interface';
import UserRepositoryInterface from '@repository/user.interface';

import { type UserLoginsResponse } from './logins.types';

@injectable()
export default class LoginsService {
  private readonly loginsRepository: LoginsRepositoryInterface;

  constructor (@inject(LoginsRepository) loginsRepository?: LoginsRepositoryInterface) {
    this.loginsRepository = loginsRepository;
  }

  public async list (page = 0): Promise<Array<UserLoginsResponse>> {
    const logins = await this.loginsRepository.findManyByPage(page);

    return logins.map((login) => {
      return {
        user: {
          name: login.user.name,
          picture: login.user.picture
        },
        method: login.method,
        date: login.date
      };
    });
  }
}
