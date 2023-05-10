import container from '@container';

import Controller from '@controller';
import LoginController from '@controllers/login';

import swaggerData from '@docs/swagger/login';

import { type Router } from 'express';

export default abstract class LoginsRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const loginController = container.get<LoginController>(LoginController);

    swaggerPaths[`/login`] = swaggerData;
    router.get(`/login`, Controller.getAsync(loginController.login));
  }
}
