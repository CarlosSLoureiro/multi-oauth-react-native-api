import type Env from '@env';

import { type Router } from 'cloudworker-router';

import { MountSwaggerUI } from '@docs/swagger';

import { StatusCodes } from 'http-status-codes';

export default abstract class SwaggerRoutes {
  public static init (router: Router<Env>, swaggerPaths: object): void {
    router.get('/swagger', async context => {
      const data = MountSwaggerUI(context.env, swaggerPaths);

      return await Promise.resolve(new Response(
        data as BodyInit,
        {
          headers: {
            'Content-Type': 'text/html'
          },
          status: StatusCodes.OK
        }
      ));
    });
  }
}
