import { inject, injectable } from 'inversify';

import type UserCreateRequest from '@requests/user.create';
import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';

import ValidationError from '@errors/validation.error';

import getHashedUserPassword from '@utils/user-password/get';
import getToken from '@utils/user-password/token';

import { type UserResponseInterface } from './user.types';

@injectable()

export default class UserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async create (data: UserCreateRequest): Promise<UserResponseInterface> {
    const userWithSameEmail = await this.userRepository.findUserByEmail(data.email);
    if (userWithSameEmail) {
      throw new ValidationError(`The email address is already registed`, [`email`]);
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: getHashedUserPassword(data.password)
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: null,
      token: getToken(user)
    };
  }
}
