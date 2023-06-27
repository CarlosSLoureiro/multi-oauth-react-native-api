import container from '@container';

import AuthController from '@controllers/auth';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import swaggerDataAuth from '@docs/swagger/auth/auth';
import swaggerDataAuthCheck from '@docs/swagger/auth/check';
import swaggerDataAuthError from '@docs/swagger/auth/error';
import swaggerDataOAuth from '@docs/swagger/auth/oauth';
import swaggerDataOAuthCallback from '@docs/swagger/auth/oauth.callback';

import setClientData from '@utils/client-data/set';

import RoutesUtils from './utils';

import AuthValidator from '@validators/auth';
import { type Router } from 'express';
import passport from 'passport';

export default abstract class AuthRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    let route: string;
    const authController = container.get<AuthController>(AuthController);
    const athenticatedMiddleware = container.get<AuthenticatedMiddleware>(AuthenticatedMiddleware);

    route = `/auth`;
    swaggerPaths[route] = swaggerDataAuth;
    router.post(route, AuthValidator.validate(), RoutesUtils.getAsync(authController.authenticateWithPassword));

    route = `/auth/check`;
    swaggerPaths[route] = swaggerDataAuthCheck;
    router.get(route, athenticatedMiddleware.handle, RoutesUtils.getAsync(authController.check));

    swaggerPaths[`/auth/{thirdParty}`] = swaggerDataOAuth;
    swaggerPaths[`/auth/{thirdParty}/callback`] = swaggerDataOAuthCallback;

    route = `google`;
    router.get(`/auth/${route}`, setClientData, passport.authenticate(route, { scope: [`profile`, `email`], session: false }));
    router.get(`/auth/${route}/callback`, passport.authenticate(route, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    route = `facebook`;
    router.get(`/auth/${route}`, setClientData, passport.authenticate(route, { scope: [`public_profile`, `email`], session: false }));
    router.get(`/auth/${route}/callback`, passport.authenticate(route, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    route = `twitter`;
    router.get(`/auth/${route}`, setClientData, passport.authenticate(route, { session: false }));
    router.get(`/auth/${route}/callback`, passport.authenticate(route, { session: false, failureRedirect: `/auth/error` }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    route = `/auth/error`;
    swaggerPaths[route] = swaggerDataAuthError;
    router.get(route, authController.error);
  }
}
