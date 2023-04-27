import type Env from '@env';
import container from '@container';

import { type Router } from 'cloudworker-router';

import LoginController from '@controllers/login';

import swaggerData from '@docs/swagger/login';

export default abstract class LoginsRoutes {
  public static init (router: Router<Env>, swaggerPaths: object): void {
    const loginController = container.get<LoginController>(LoginController);

    swaggerPaths['/login'] = swaggerData;
    router.post('/login', loginController.login);
  }
}
