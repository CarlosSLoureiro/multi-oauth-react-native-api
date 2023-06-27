import container from '@container';

import ActivityController from '@controllers/activity';

import swaggerDataListActivities from '@docs/swagger/activity/list';

import RoutesUtils from './utils';

import { type Router } from 'express';

export default abstract class ActivityRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const activityController = container.get<ActivityController>(ActivityController);

    swaggerPaths[`/activities/list/{page}`] = swaggerDataListActivities;
    router.get(`/activities/list/:page`, RoutesUtils.getAsync(activityController.list));
  }
}
