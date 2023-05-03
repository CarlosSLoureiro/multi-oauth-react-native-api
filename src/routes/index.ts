
import LoginsRoutes from '@routes/login';
import SwaggerRoutes from '@routes/swagger';

import { type Router } from 'express';

export default abstract class Routes {
  public static init (router: Router): void {
    const swaggerPaths = {};

    LoginsRoutes.init(router, swaggerPaths);
    // SwaggerRoutes.init(router, swaggerPaths);
  }
}
