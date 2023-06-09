import container from '@container';

import AuthController from '@controllers/auth';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import swaggerDataAuth from '@docs/swagger/auth/auth';
import swaggerDataAuthCheck from '@docs/swagger/auth/check';
import swaggerDataAuthError from '@docs/swagger/auth/error';

import setClientData from '@utils/client-data/set';

import RoutesUtils from './utils';

import { type Router } from 'express';
import passport from 'passport';

export default abstract class AuthRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    let route: string;
    const authController = container.get<AuthController>(AuthController);

    route = `/login`;
    swaggerPaths[route] = swaggerDataAuth;
    router.post(route, RoutesUtils.getAsync(authController.authenticateWithPassword));

    route = `/auth/check`;
    swaggerPaths[route] = swaggerDataAuthCheck;
    router.get(route, AuthenticatedMiddleware.handle, RoutesUtils.getAsync(authController.check));

    route = `/auth/error`;
    swaggerPaths[route] = swaggerDataAuthError;
    router.get(route, authController.error);

    router.get(`/auth/google`, setClientData, passport.authenticate(`google`, { scope: [`profile`, `email`], session: false }));

    router.get(`/auth/google/callback`, passport.authenticate(`google`, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));
  }
}
