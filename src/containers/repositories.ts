import { type Container } from 'inversify';

import UserRepository from '@repository/user';

export default abstract class ReigsterRepositories {
  public static config (container: Container): void {
    container.bind<UserRepository>(UserRepository).toSelf();
  }
}
