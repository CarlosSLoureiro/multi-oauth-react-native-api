import container from '@container';

import AuthController from '@controllers/auth';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import { OAuthProviders } from '@auth';

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

    swaggerPaths[`/auth/{provider}`] = swaggerDataOAuth;
    swaggerPaths[`/auth/{provider}/callback`] = swaggerDataOAuthCallback;

    router.get(`/auth/${OAuthProviders.GOOGLE}`, setClientData, passport.authenticate(OAuthProviders.GOOGLE, { scope: [`profile`, `email`], session: false }));
    router.get(`/auth/${OAuthProviders.GOOGLE}/callback`, passport.authenticate(OAuthProviders.GOOGLE, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    router.get(`/auth/${OAuthProviders.FACEBOOK}`, setClientData, passport.authenticate(OAuthProviders.FACEBOOK, { scope: [`public_profile`, `email`], session: false }));
    router.get(`/auth/${OAuthProviders.FACEBOOK}/callback`, passport.authenticate(OAuthProviders.FACEBOOK, { failureRedirect: `/auth/error`, session: false }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    router.get(`/auth/${OAuthProviders.TWITTER}`, setClientData, passport.authenticate(OAuthProviders.TWITTER, { session: false }));
    router.get(`/auth/${OAuthProviders.TWITTER}/callback`, passport.authenticate(OAuthProviders.TWITTER, { session: false, failureRedirect: `/auth/error` }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    router.get(`/auth/${OAuthProviders.LINKEDIN}`, setClientData, passport.authenticate(OAuthProviders.LINKEDIN, { session: false }));
    router.get(`/auth/${OAuthProviders.LINKEDIN}/callback`, passport.authenticate(OAuthProviders.LINKEDIN, { session: false, failureRedirect: `/auth/error` }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    router.get(`/auth/${OAuthProviders.GITHUB}`, setClientData, passport.authenticate(OAuthProviders.GITHUB, { scope: [`user:email`], session: false }));
    router.get(`/auth/${OAuthProviders.GITHUB}/callback`, passport.authenticate(OAuthProviders.GITHUB, { session: false, failureRedirect: `/auth/error` }), RoutesUtils.getAsync(authController.authenticateWithOAuthProfile));

    route = `/auth/error`;
    swaggerPaths[route] = swaggerDataAuthError;
    router.get(route, authController.error);
  }
}
