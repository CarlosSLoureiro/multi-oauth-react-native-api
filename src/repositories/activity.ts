import { injectable } from 'inversify';

import Activity from '@models/activity';
import type ActivityInterface from '@models/activity.interface';
import User from '@models/user';

import SequelizeError from '@errors/sequelize.error';

import type ActivityRepositoryInterface from './activity.interface';

@injectable()

export default class ActivityRepository implements ActivityRepositoryInterface {
  public async create (activityData: Omit<ActivityInterface, "id">): Promise<Activity> {
    try {
      return await Activity.create(activityData);
    } catch (error) {
      throw new SequelizeError(error);
    }
  }

  public async findManyByPage (page: number): Promise<Array<Activity>> {
    try {
      const limit = 10;
      const offset = page * limit;
      return await Activity.findAll({
        order: [[`id`, `DESC`]],
        limit,
        offset,
        include: [{ model: User, required: true }]
      });
    } catch (error) {
      throw new SequelizeError(error);
    }
  }
}
