import container from '@container';

import Controller from '@controller';
import LoginController from '@controllers/login';

import swaggerData from '@docs/swagger/auth';

import { type Router } from 'express';
import passport from 'passport';

export default abstract class AuthRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const loginController = container.get<LoginController>(LoginController);

    swaggerPaths[`/auth`] = swaggerData;
    router.post(`/auth`, Controller.getAsync(loginController.authenticateWithPassword));

    // router.get(`/auth/error`, (request: Request, response: Response) => response.json({ status: `Oauth login falied!` }));

    router.get(`/auth/google`, passport.authenticate(`google`, { scope: [`profile`, `email`], session: false }));

    router.get(`/auth/google/callback`, passport.authenticate(`google`, { failureRedirect: `/auth/error`, session: false }), Controller.getAsync(loginController.authenticateWithOAuthProfile));
  }
}
