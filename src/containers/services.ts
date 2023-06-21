import { type Container } from 'inversify';

import ActivityService from '@services/activity';
import AuthService from '@services/auth';
import UserService from '@services/user';

export default abstract class RegisterServices {
  public static config (container: Container): void {
    container.bind<ActivityService>(ActivityService).toSelf();
    container.bind<AuthService>(AuthService).toSelf();
    container.bind<UserService>(UserService).toSelf();
  }
}
