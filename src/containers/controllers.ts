import { type Container } from 'inversify';

import AuthController from '@controllers/auth';

export default abstract class RegisterControllers {
  public static config (container: Container): void {
    container.bind<AuthController>(AuthController).toSelf();
  }
}
