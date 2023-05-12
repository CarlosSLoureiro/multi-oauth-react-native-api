import container from '@container';

import { injectable } from 'inversify';

import Controller from '@controller';
import AuthService from '@services/auth';

import CryptoJS from "crypto-js";
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

  public async authenticateWithOAuthProfile (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const authService = container.get<AuthService>(AuthService);
      const profile: Profile = request.body;

      const jsonResponse = JSON.stringify(await authService.authenticateWithOAuthProfile(profile));

      const userAgent = request.headers[`user-agent`];

      const isMobile = ((/android/i.test(userAgent)) || (/iPad|iPhone|iPod/.test(userAgent)));

      const encrypted = encodeURIComponent(CryptoJS.AES.encrypt(jsonResponse, `CARLOS LOUREIRO`).toString());

      if (isMobile) {
        console.log(`solicitou do mobile`);
        response.redirect(`exp://192.168.0.108:19000/--/login?data=${encrypted}`);
      } else {
        console.log(`solicitou do web`);
        response.redirect(`http://localhost:19006/?login=${encrypted}`);
      }
    } catch (e) {
      next(e);
    }
  }
}
