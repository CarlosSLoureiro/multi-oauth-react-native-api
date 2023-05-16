import { type NextFunction, type Request, type Response } from 'express';

export default abstract class RoutesUtils {
  static getAsync (fn: (request: Request, response: Response, next: NextFunction) => Promise<any>) {
    return (request: Request, response: Response, next: NextFunction) => {
      Promise.resolve(fn(request, response, next)).catch(next);
    };
  }
}
