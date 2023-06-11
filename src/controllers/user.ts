import container from '@container';

import { injectable } from 'inversify';

import UserService from '@services/user';

import { type NextFunction, type Request, type Response } from 'express';

@injectable()

export default class UserController {
  public async create (request: Request, response: Response, next: NextFunction): Promise<object> {
    try {
      const userService = container.get<UserService>(UserService);

      const data = await userService.create(request.body);

      return response.json(data);
    } catch (e) {
      next(e);
    }
  }
}
