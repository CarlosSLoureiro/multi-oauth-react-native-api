
import AuthRoutes from '@routes/auth';
import SwaggerRoutes from '@routes/swagger';

import { type Router } from 'express';

export default abstract class Routes {
  public static config (router: Router): void {
    const swaggerPaths = {};

    AuthRoutes.config(router, swaggerPaths);
    SwaggerRoutes.config(router, swaggerPaths);
  }
}
