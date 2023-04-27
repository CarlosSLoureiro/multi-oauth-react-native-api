import type Env from '@env';

import { type Router } from 'cloudworker-router';

import LoginsRoutes from '@routes/login';
import SwaggerRoutes from '@routes/swagger';

export default abstract class Routes {
  public static init (router: Router<Env>): void {
    const swaggerPaths = {};

    LoginsRoutes.init(router, swaggerPaths);
    SwaggerRoutes.init(router, swaggerPaths);
  }
}
