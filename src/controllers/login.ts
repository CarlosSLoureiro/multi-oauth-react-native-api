import type Env from '@env';
import container from '@container';

import { injectable } from 'inversify';
import { type Context } from 'cloudworker-router';

import Controller from '@controller';
import LoginService from '@services/login';

@injectable()

export default class LoginController extends Controller {
  public async login (context: Context<Env>): Promise<Response> {
    const loginService = container.get<LoginService>(LoginService);

    return super.jsonResponse(await loginService.doLogin());
  }
}
