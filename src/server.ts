import 'reflect-metadata'

import Env from './env';
import { Router } from 'cloudworker-router';
import { ExecutionContext } from '@cloudflare/workers-types';
import { StatusCodes } from 'http-status-codes';
import Routes from './routes';

const router = new Router<Env>();

Routes.init(router);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // await sequelize.sync({force: true});
    const response = await router.handle(request, env, ctx);

    if (response.status === StatusCodes.NOT_FOUND) {
      return new Response(JSON.stringify({"message": "The requested endpoint point has not found"}), {status: StatusCodes.NOT_FOUND});
    }

    return response;
  }
};