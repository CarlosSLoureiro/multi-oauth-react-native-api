import { type Container } from 'inversify';

import LoginController from '@controllers/login';

export default abstract class ReigsterControllers {
  public static init (container: Container): void {
    container.bind<LoginController>(LoginController).toSelf();
  }
}
