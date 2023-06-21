import container from '@container';

import { injectable } from 'inversify';

import LoginsService from '@services/logins';

import { type NextFunction, type Request, type Response } from 'express';

@injectable()

export default class LoginsController {
  public async list (request: Request, response: Response, next: NextFunction): Promise<object> {
    try {
      const userService = container.get<LoginsService>(LoginsService);

      const data = await userService.list(0);

      return response.json(data);
    } catch (e) {
      next(e);
    }
  }
}
