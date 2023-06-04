import { inject, injectable } from 'inversify';

import type User from '@models/user';

import type UserCreateRequest from '@requests/user.create';

import ValidationError from '@errors/validation.error';

import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';

@injectable()

export default class UserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async create (data: UserCreateRequest): Promise<User> {
    const userWithSameEmail = await this.userRepository.findUserByEmail(data.email);
    if (userWithSameEmail) {
      throw new ValidationError(`The email address is already registed`, [`email`]);
    }
    return await this.userRepository.create(data);
  }
}
