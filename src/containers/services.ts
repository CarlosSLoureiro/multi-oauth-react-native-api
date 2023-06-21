import { type Container } from 'inversify';

import AuthService from '@services/auth';
import LoginsService from '@services/logins';
import UserService from '@services/user';

export default abstract class RegisterServices {
  public static config (container: Container): void {
    container.bind<AuthService>(AuthService).toSelf();
    container.bind<LoginsService>(LoginsService).toSelf();
    container.bind<UserService>(UserService).toSelf();
  }
}
