import { injectable } from 'inversify';

import { type LoginResponse } from './login.types';

@injectable()

export default class LoginService {
  constructor (
    private readonly userRepository: string = 'test'
  ) {}

  public async doLogin (): Promise<LoginResponse> {
    const data: LoginResponse = {
      token: `${this.userRepository} example`
    };

    return await Promise.resolve(data);
  }
}
