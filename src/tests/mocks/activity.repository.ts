import type ActivityRepositoryInterface from "@repository/activity.interface";

export default class ActivityRepositoryMock implements jest.Mocked<ActivityRepositoryInterface> {
  public create = jest.fn();
  public findManyByPage = jest.fn();
}
