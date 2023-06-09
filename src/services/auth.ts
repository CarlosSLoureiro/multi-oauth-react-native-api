import { inject, injectable } from 'inversify';

import type User from '@models/user';

import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';
import { type AuthenticatedUser } from '@middlewares/authenticated.types';

import GenericError from '@errors/generic.error';

import { type AuthResponseInterface } from './auth.types';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type Profile } from 'passport';

@injectable()

export default class AuthService {
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

  public async authenticateWithPassword (email: string, password: string): Promise<AuthResponseInterface> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw new GenericError(`User not found`);

    password = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
    if (user.password !== password) throw new GenericError(`Wrong password`);

    return await Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: this.getJWT(user)
    });
  }

  public async authenticateWithOAuthProfile (profile: Profile): Promise<AuthResponseInterface | undefined> {
    if (profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      let user = await this.userRepository.findUserByEmail(email);

      if (user === null) {
        user = await this.userRepository.create({
          name: profile.displayName,
          email
        });
      }

      return await Promise.resolve({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: this.getJWT(user)
      });
    }
  }

  public async check (id: number): Promise<AuthResponseInterface | undefined> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw new GenericError(`User not found`);

    return await Promise.resolve({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: this.getJWT(user)
    });
  }

  public error (): { error: string } {
    return {
      error: `Could not complete the authentication`
    };
  }
}
