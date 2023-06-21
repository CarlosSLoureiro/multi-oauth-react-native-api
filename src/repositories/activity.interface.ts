import type Activity from '@models/activity';
import type User from '@models/user';

export default interface ActivityRepositoryInterface {
  create: (user: User, message: string) => Promise<Activity>;
  findManyByPage: (list: number) => Promise<Array<Activity>>;
}
