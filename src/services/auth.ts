import { inject, injectable } from 'inversify';

import { type AuthResponse } from './auth.types';

import UserRepository from '@repository/user';
import UserRepositoryInterface from '@repository/user.interface';
import { type Profile } from 'passport';

@injectable()

export default class AuthService {
  private readonly userRepository: UserRepositoryInterface;

  constructor (@inject(UserRepository) userRepository?: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async authenticateWithPassword (email: string, password: string): Promise<AuthResponse> {
    const data: AuthResponse = {
      success: true,
      token: `Must search user & create token for "${email}: ${password}" example`
    };

    return await Promise.resolve(data);
  }

  public async authenticateWithOAuthProfile (profile: Profile): Promise<AuthResponse | undefined> {
    if (profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      let user = await this.userRepository.findUserByEmail(email);

      if (user === null) {
        user = await this.userRepository.create({
          name: profile.displayName,
          email
        });
      }

      const data: AuthResponse = {
        success: true,
        token: `must search or create new user & create token for "${user.name} (${Number(user.id)})"`
      };

      return data;
    }
  }

  public error (): { success: boolean } {
    return {
      success: false
    };
  }
}
