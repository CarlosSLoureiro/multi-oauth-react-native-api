import ActivityService from '@services/activity';
import ActivityRepositoryMock from '@repository/activity.mock';

import Database from 'database';
import doenv from 'dotenv';

describe(`ActivityService`, () => {
  let activityRepository: ActivityRepositoryMock;
  let activityService: ActivityService;

  beforeEach(() => {
    doenv.config();
    Database.test();

    activityRepository = new ActivityRepositoryMock();
    activityService = new ActivityService(activityRepository);
  });

  describe(`list`, () => {
    it(`should return a list of user activities`, async () => {
      // Arrange
      const page = 0;
      const activities = [
        {
          id: 1,
          user: {
            name: `John Doe`,
            picture: `profile_picture.png`
          },
          message: `Logged in`,
          date: `2023-06-01T10:00:00Z`
        },
        {
          id: 2,
          user: {
            name: `Jane Smith`,
            picture: `profile_picture.png`
          },
          message: `Created a new post`,
          date: `2023-06-02T14:30:00Z`
        }
      ];
      activityRepository.findManyByPage.mockResolvedValue(activities);

      // Act
      const response = await activityService.list(page);

      // Assert
      expect(response).toBeDefined();
      expect(response.length).toBe(activities.length);
      expect(response[0].id).toBe(activities[0].id);
      expect(response[0].user.name).toBe(activities[0].user.name);
      expect(response[0].user.picture).toBe(activities[0].user.picture);
      expect(response[0].message).toBe(activities[0].message);
      expect(response[0].date).toBe(activities[0].date);
      expect(activityRepository.findManyByPage).toHaveBeenCalledWith(page);
    });

    it(`should return an empty array if no activities are found`, async () => {
      // Arrange
      const page = 0;
      const activities = [];
      activityRepository.findManyByPage.mockResolvedValue(activities);

      // Act
      const response = await activityService.list(page);

      // Assert
      expect(response).toBeDefined();
      expect(response.length).toBe(0);
      expect(activityRepository.findManyByPage).toHaveBeenCalledWith(page);
    });
  });
});
