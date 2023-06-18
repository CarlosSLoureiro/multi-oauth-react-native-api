import { type Container } from 'inversify';

import AuthenticatedMiddleware from '@middlewares/authenticated';

export default abstract class RegisterMiddlewares {
  public static config (container: Container): void {
    container.bind<AuthenticatedMiddleware>(AuthenticatedMiddleware).toSelf();
  }
}
