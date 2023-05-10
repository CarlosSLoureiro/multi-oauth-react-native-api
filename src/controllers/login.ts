import container from '@container';

import { injectable } from 'inversify';

import Controller from '@controller';
import LoginService from '@services/login';

import { type NextFunction, type Request, type Response } from 'express';
import { type Profile } from 'passport';

@injectable()

export default class LoginController extends Controller {
  public async authenticateWithPassword (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const loginService = container.get<LoginService>(LoginService);

      const { email, password } = request.body;

      return response.json(await loginService.authenticateWithPassword(email, password));
    } catch (e) {
      next(e);
    }
  }

  public async authenticateWithOAuthProfile (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const loginService = container.get<LoginService>(LoginService);
      const profile: Profile = request.body;

      return response.json(await loginService.authenticateWithOAuthProfile(profile));
    } catch (e) {
      next(e);
    }
  }
}
