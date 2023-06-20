import { type Container } from 'inversify';

import LoginsRepository from '@repository/logins';
import UserRepository from '@repository/user';

export default abstract class RegisterRepositories {
  public static config (container: Container): void {
    container.bind<LoginsRepository>(LoginsRepository).toSelf();
    container.bind<UserRepository>(UserRepository).toSelf();
  }
}
