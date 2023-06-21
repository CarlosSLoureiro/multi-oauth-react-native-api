import container from '@container';

import { injectable } from 'inversify';

import ActivityService from '@services/activity';

import { type NextFunction, type Request, type Response } from 'express';

@injectable()

export default class ActivityController {
  public async list (request: Request, response: Response, next: NextFunction): Promise<object> {
    try {
      const activityService = container.get<ActivityService>(ActivityService);

      const data = await activityService.list(0);

      return response.json(data);
    } catch (e) {
      next(e);
    }
  }
}
