import type Activity from '@models/activity';
import type ActivityInterface from '@models/activity.interface';

export default interface ActivityRepositoryInterface {
  create: (activityData: Omit<ActivityInterface, "id">) => Promise<Activity>;
  findManyByPage: (list: number) => Promise<Array<Activity>>;
}
