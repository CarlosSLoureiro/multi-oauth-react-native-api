import { type Container } from 'inversify';

import AuthService from '@services/auth';
import UserService from '@services/user';

export default abstract class ReigsterServices {
  public static config (container: Container): void {
    container.bind<AuthService>(AuthService).toSelf();
    container.bind<UserService>(UserService).toSelf();
  }
}
