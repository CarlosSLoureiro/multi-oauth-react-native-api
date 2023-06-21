import { type Container } from 'inversify';

import ActivityRepository from '@repository/activity';
import UserRepository from '@repository/user';

export default abstract class RegisterRepositories {
  public static config (container: Container): void {
    container.bind<ActivityRepository>(ActivityRepository).toSelf();
    container.bind<UserRepository>(UserRepository).toSelf();
  }
}
