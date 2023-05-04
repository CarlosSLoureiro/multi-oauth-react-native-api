import { injectable } from 'inversify';

import { type NextFunction, type Request, type Response } from 'express';

@injectable()

export default abstract class Controller {
  static getAsync (fn: (request: Request, response: Response, next: NextFunction) => Promise<any>) {
    return (request: Request, response: Response, next: NextFunction) => {
      Promise.resolve(fn(request, response, next)).catch(next);
    };
  }
}
