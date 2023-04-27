import { type Container } from 'inversify';

import LoginService from '@services/login';

export default abstract class ReigsterServices {
  public static init (container: Container): void {
    container.bind<LoginService>(LoginService).toSelf();
  }
}
