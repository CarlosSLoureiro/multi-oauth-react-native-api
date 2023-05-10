import container from '@container';

import { injectable } from 'inversify';

import Controller from '@controller';
import AuthService from '@services/auth';

import { type NextFunction, type Request, type Response } from 'express';
import { type Profile } from 'passport';

@injectable()

export default class AuthController extends Controller {
  public async authenticateWithPassword (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const authService = container.get<AuthService>(AuthService);

      const { email, password } = request.body;

      return response.json(await authService.authenticateWithPassword(email, password));
    } catch (e) {
      next(e);
    }
  }

  public async authenticateWithOAuthProfile (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const authService = container.get<AuthService>(AuthService);
      const profile: Profile = request.body;

      return response.json(await authService.authenticateWithOAuthProfile(profile));
    } catch (e) {
      next(e);
    }
  }
}
