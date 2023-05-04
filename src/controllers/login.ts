import container from '@container';

import { injectable } from 'inversify';

import Controller from '@controller';
import LoginService from '@services/login';

import { type NextFunction, type Request, type Response } from 'express';

@injectable()

export default class LoginController extends Controller {
  public async login (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const loginService = container.get<LoginService>(LoginService);

      return response.json(await loginService.doLogin());
    } catch (e) {
      next(e);
    }
  }
}
