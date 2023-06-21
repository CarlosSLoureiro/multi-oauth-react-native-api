import container from '@container';

import ActivityController from '@controllers/activity';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import RoutesUtils from './utils';

import { type Router } from 'express';

export default abstract class ActivityRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const activityController = container.get<ActivityController>(ActivityController);
    const athenticatedMiddleware = container.get<AuthenticatedMiddleware>(AuthenticatedMiddleware);

    router.get(`/activities/list/:page`, athenticatedMiddleware.handle, RoutesUtils.getAsync(activityController.list));
  }
}
