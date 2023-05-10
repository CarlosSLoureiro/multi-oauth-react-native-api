import { injectable } from 'inversify';

import { type LoginResponse } from './login.types';

import { type Profile } from 'passport';

@injectable()

export default class LoginService {
  constructor (
    private readonly userRepository: string = `test`
  ) {}

  public async authenticateWithPassword (email: string, password: string): Promise<LoginResponse> {
    const data: LoginResponse = {
      token: `Must search user & create token for "${email}: ${password}" example`
    };

    return await Promise.resolve(data);
  }

  public async authenticateWithOAuthProfile (profile: Profile): Promise<LoginResponse> {
    const data: LoginResponse = {
      token: `must search or create new user & create token for "${profile.emails[0].value}"`
    };

    return await Promise.resolve(data);
  }
}
