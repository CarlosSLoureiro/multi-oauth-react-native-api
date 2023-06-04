import { inject, injectable } from 'inversify';

import type User from '@models/user';
import type UserInterface from '@models/user.interface';

import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';

@injectable()

export default class UserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async create (user: Partial<UserInterface>): Promise<User> {
    return await this.userRepository.create(user);
  }
}
