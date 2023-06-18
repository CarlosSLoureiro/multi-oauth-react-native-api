import container from '@container';

import { injectable } from 'inversify';

import AuthService from '@services/auth';

import GenericError from '@errors/generic.error';

import { type AuthenticatedUser } from './authenticated.types';

import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

@injectable()

export default class AuthenticatedMiddleware {
  public handle (request: Request, response: Response, next: NextFunction): void {
    const authService = container.get<AuthService>(AuthService);
    const token = request.headers.authorization?.split(` `)[1];

    if (!token) {
      throw new GenericError(`Must be authenticated to access`, StatusCodes.UNAUTHORIZED);
    }

    try {
      const authenticatedUser = jwt.verify(token, process.env.API_SECRET) as AuthenticatedUser;

      authService.verifyUserByIdAndPassword(authenticatedUser.id, authenticatedUser.password).then(user => {
        request.user = user;
        next();
      }).catch(e => {
        console.log(`check error > `, e);
        throw e;
      });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new GenericError(`Expired auth token`, StatusCodes.UNAUTHORIZED);
      } else if (err instanceof GenericError) {
        throw new GenericError(err.message, StatusCodes.UNAUTHORIZED);
      } else {
        throw new GenericError(`Invalid auth token`, StatusCodes.UNAUTHORIZED);
      }
    }
  }
}
