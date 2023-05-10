import { type Container } from 'inversify';

import LoginController from '@controllers/login';

export default abstract class ReigsterControllers {
  public static config (container: Container): void {
    container.bind<LoginController>(LoginController).toSelf();
  }
}
