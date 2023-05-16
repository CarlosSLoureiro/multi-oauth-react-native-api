import container from '@container';

import { injectable } from 'inversify';

import AuthService from '@services/auth';

import ControllersUtils from './utils';

import CryptoJS from "crypto-js";
import { type NextFunction, type Request, type Response } from 'express';
import { type Profile } from 'passport';

@injectable()

export default class AuthController {
  public async authenticateWithPassword (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const authService = container.get<AuthService>(AuthService);

      const { email, password } = request.body;

      return response.json(await authService.authenticateWithPassword(email, password));
    } catch (e) {
      next(e);
    }
  }

  public async authenticateWithOAuthProfile (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const authService = container.get<AuthService>(AuthService);

      const profile: Profile = request.body;

      const data = await authService.authenticateWithOAuthProfile(profile);

      ControllersUtils.redirectToDeepOrQueryLink(request, response, data);
    } catch (e) {
      next(e);
    }
  }
}
