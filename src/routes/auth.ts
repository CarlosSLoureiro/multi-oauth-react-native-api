import container from '@container';

import AuthController from '@controllers/auth';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import swaggerDataAuth from '@docs/swagger/auth/auth';
import swaggerDataAuthCheck from '@docs/swagger/auth/check';
import swaggerDataAuthError from '@docs/swagger/auth/error';
import swaggerDataOAuth2 from '@docs/swagger/auth/oauth2';

import setClientData from '@utils/client-data/set';

import RoutesUtils from './utils';

import AuthValidator from '@validators/auth';
import { type Router } from 'express';
import passport from 'passport';

export default abstract class AuthRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    let route: string;
    const authController = container.get<AuthController>(AuthController);

    route = `/auth`;
    swaggerPaths[route] = swaggerDataAuth;
    router.post(route, AuthValidator.validate(), RoutesUtils.getAsync(authController.authenticateWithPassword));

    route = `/auth/check`;
    swaggerPaths[route] = swaggerDataAuthCheck;
    router.get(route, AuthenticatedMiddleware.handle, RoutesUtils.getAsync(authController.check));

    route = `/auth/google`;
    swaggerPaths[route] = swaggerDataOAuth2.getAuthWith(`google`);
    router.get(route, setClientData, passport.authenticate(`google`, { scope: [`profile`, `email`], session: false }));

    route = `/auth/google/callback`;
    swaggerPaths[route] = swaggerDataOAuth2.getCallback(`google`);
    router.get(route, passport.authenticate(`google`, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    route = `/auth/error`;
    swaggerPaths[route] = swaggerDataAuthError;
    router.get(route, authController.error);
  }
}
