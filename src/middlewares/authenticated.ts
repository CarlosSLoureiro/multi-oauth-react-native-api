import GenericError from '@errors/generic.error';

import { type AuthenticatedUser } from './authenticated.types';

import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export default class AuthenticatedMiddleware {
  static handle (req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(` `)[1];

    if (!token) {
      throw new GenericError(`Must be authenticated to access`, StatusCodes.UNAUTHORIZED);
    }

    try {
      const decoded = jwt.verify(token, process.env.API_SECRET) as AuthenticatedUser;

      req.user = decoded;

      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new GenericError(`Expired auth token`, StatusCodes.UNAUTHORIZED);
      } else {
        throw new GenericError(`Invalid auth token`, StatusCodes.UNAUTHORIZED);
      }
    }
  }
}
