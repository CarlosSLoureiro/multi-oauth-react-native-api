import { inject, injectable } from 'inversify';

import type User from '@models/user';

import type UserCreateRequest from '@requests/user.create';
import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';
import { type AuthenticatedUser } from '@middlewares/authenticated.types';

import ValidationError from '@errors/validation.error';

import { type UserResponseInterface } from './user.types';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@injectable()

export default class UserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  private getJWT (user: User): string {
    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    return jwt.sign(authenticatedUser, process.env.JWT_SECRET, { expiresIn: `7d` });
  }

  public async create (data: UserCreateRequest): Promise<UserResponseInterface> {
    const userWithSameEmail = await this.userRepository.findUserByEmail(data.email);
    if (userWithSameEmail) {
      throw new ValidationError(`The email address is already registed`, [`email`]);
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, process.env.BCRYPT_SALT)
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: null,
      token: this.getJWT(user)
    };
  }
}
