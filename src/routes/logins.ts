import container from '@container';

import LoginsController from '@controllers/logins';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import RoutesUtils from './utils';

import { type Router } from 'express';

export default abstract class LoginsRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const loginController = container.get<LoginsController>(LoginsController);
    const athenticatedMiddleware = container.get<AuthenticatedMiddleware>(AuthenticatedMiddleware);

    // router.get(`/logins/list`, athenticatedMiddleware.handle, RoutesUtils.getAsync(loginController.list));
    router.get(`/logins/list`, RoutesUtils.getAsync(loginController.list));
  }
}
