import Env from '../env';
import * as html from './swagger.html';
import swaggerComponents from './swagger/components';

export function MountSwaggerUI(env: Env, swaggerPaths: Object): String {
  return html.default
    .replace('SWAGGER_PATHS', JSON.stringify(swaggerPaths))
    .replace('SWAGGER_COMPONENTS', JSON.stringify(swaggerComponents))
    .replace('APP_NAME', env.NAME)
    .replace('APP_VERSION', env.VERSION);
}