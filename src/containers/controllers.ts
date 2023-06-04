import { type Container } from 'inversify';

import AuthController from '@controllers/auth';
import UserController from '@controllers/user';

export default abstract class RegisterControllers {
  public static config (container: Container): void {
    container.bind<AuthController>(AuthController).toSelf();
    container.bind<UserController>(UserController).toSelf();
  }
}
