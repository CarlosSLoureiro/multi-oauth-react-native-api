
import LoginsRoutes from '@routes/login';
import SwaggerRoutes from '@routes/swagger';

import { type Router } from 'express';

export default abstract class Routes {
  public static config (router: Router): void {
    const swaggerPaths = {};

    LoginsRoutes.config(router, swaggerPaths);
    SwaggerRoutes.config(router, swaggerPaths);
  }
}
