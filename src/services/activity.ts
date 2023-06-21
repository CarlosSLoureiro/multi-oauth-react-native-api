import { inject, injectable } from 'inversify';

import ActivityRepository from '@repository/activity';
import ActivityRepositoryInterface from '@repository/activity.interface';

import { type UserActivityResponse } from './activity.types';

@injectable()
export default class ActivityService {
  private readonly activityRepository: ActivityRepositoryInterface;

  constructor (@inject(ActivityRepository) activityRepository?: ActivityRepositoryInterface) {
    this.activityRepository = activityRepository;
  }

  public async list (page = 0): Promise<Array<UserActivityResponse>> {
    const activities = await this.activityRepository.findManyByPage(page);

    return activities.map((activity) => {
      return {
        user: {
          name: activity.user.name,
          picture: activity.user.picture
        },
        message: activity.message,
        date: activity.date
      };
    });
  }
}
