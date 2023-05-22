import container from '@container';

import AuthController from '@controllers/auth';

import swaggerData from '@docs/swagger/auth';

import setClientData from '@utils/client-data/set';

import RoutesUtils from './utils';

import { type Router } from 'express';
import passport from 'passport';

export default abstract class AuthRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const authController = container.get<AuthController>(AuthController);

    swaggerPaths[`/auth`] = swaggerData;
    router.post(`/auth`, RoutesUtils.getAsync(authController.authenticateWithPassword));

    router.get(`/auth/error`, authController.error);

    router.get(`/auth/google`, setClientData, passport.authenticate(`google`, { scope: [`profile`, `email`], session: false }));

    router.get(`/auth/google/callback`, passport.authenticate(`google`, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));
  }
}
