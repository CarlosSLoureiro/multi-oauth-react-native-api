import { inject, injectable } from 'inversify';

import type User from '@models/user';

import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';

import GenericError from '@errors/generic.error';
import ValidationError from '@errors/validation.error';

import matchPassword from '@utils/user-password/compare';
import getToken from '@utils/user-password/token';

import { type AuthResponseInterface, type UserDataResponseInterface } from './auth.types';

import { StatusCodes } from 'http-status-codes';
import { type Profile } from 'passport';

@injectable()

export default class AuthService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async authenticateWithPassword (email: string, password: string): Promise<UserDataResponseInterface> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw new ValidationError(`User not found`, [`email`]);

    if (user.password === null) throw new ValidationError(`The user does not have a registered password`, [`password`]);

    if (!matchPassword(password, user.password)) throw new ValidationError(`Wrong user password`, [`password`]);

    return await Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: getToken(user)
    });
  }

  public async authenticateWithOAuthProfile (profile: Profile): Promise<AuthResponseInterface> {
    if (profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      let user = await this.userRepository.findUserByEmail(email);

      let picture = null;

      if (profile.photos && profile.photos.length > 0) {
        picture = profile.photos[0].value;
      }

      if (user === null) {
        user = await this.userRepository.create({
          name: profile.displayName,
          email,
          picture
        });
      } else if (user.picture === null) {
        user = await this.userRepository.update(user, { picture });
      }

      return await Promise.resolve({
        action: `auth`,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: getToken(user)
        }
      });
    }
  }

  public async verifyUserByIdAndPassword (id: number, password: string | null): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw new GenericError(`User not found`, StatusCodes.UNAUTHORIZED);

    if (user.password !== password) throw new GenericError(`Wrong user password`, StatusCodes.UNAUTHORIZED);

    return user;
  }

  public async check (user: User): Promise<Omit<UserDataResponseInterface, "token">> {
    return await Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture
    });
  }

  public error (): { error: string } {
    return {
      error: `Could not complete the authentication`
    };
  }
}
