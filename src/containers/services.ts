import { type Container } from 'inversify';

import AuthService from '@services/auth';

export default abstract class ReigsterServices {
  public static config (container: Container): void {
    container.bind<AuthService>(AuthService).toSelf();
  }
}
