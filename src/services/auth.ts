import { injectable } from 'inversify';

import { type AuthResponse } from './auth.types';

import { type Profile } from 'passport';

@injectable()

export default class AuthService {
  constructor (
    private readonly userRepository: string = `test`
  ) {}

  public async authenticateWithPassword (email: string, password: string): Promise<AuthResponse> {
    const data: AuthResponse = {
      token: `Must search user & create token for "${email}: ${password}" example`
    };

    return await Promise.resolve(data);
  }

  public async authenticateWithOAuthProfile (profile: Profile): Promise<AuthResponse> {
    const data: AuthResponse = {
      token: `must search or create new user & create token for "${profile.emails[0].value}"`
    };

    return await Promise.resolve(data);
  }
}
