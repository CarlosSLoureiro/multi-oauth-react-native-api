
import ActivityRoutes from '@routes/activity';
import AuthRoutes from '@routes/auth';
import SwaggerRoutes from '@routes/swagger';
import UserRoutes from '@routes/user';

import { type Router } from 'express';

export default abstract class Routes {
  public static config (router: Router): void {
    const swaggerPaths = {};

    AuthRoutes.config(router, swaggerPaths);
    UserRoutes.config(router, swaggerPaths);
    ActivityRoutes.config(router, swaggerPaths);

    /* Should not config swagger routes in production but it is for educational purposes...

    if (process.env.API_ENV === `development`) {
      SwaggerRoutes.config(router, swaggerPaths);
    }
    */
    SwaggerRoutes.config(router, swaggerPaths);
  }
}
