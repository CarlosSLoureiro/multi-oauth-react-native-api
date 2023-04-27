import 'reflect-metadata';

import type Env from '@env';

import { type ExecutionContext } from '@cloudflare/workers-types';
import { Router } from 'cloudworker-router';

import Routes from '@routes';

import { StatusCodes } from 'http-status-codes';

const router = new Router<Env>();

Routes.init(router);

export default {
  async fetch (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // await sequelize.sync({force: true});
    const response = await router.handle(request, env, ctx);

    if (response.status === StatusCodes.NOT_FOUND) {
      return new Response(JSON.stringify({ message: 'The requested endpoint point has not found' }), { status: StatusCodes.NOT_FOUND });
    }

    return response;
  }
};
