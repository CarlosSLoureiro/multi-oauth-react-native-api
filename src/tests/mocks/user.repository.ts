import type UserRepositoryInterface from "@repository/user.interface";

export default class UserRepositoryMock implements jest.Mocked<UserRepositoryInterface> {
  public findUserById = jest.fn();
  public findUserByEmail = jest.fn();
  public create = jest.fn();
  public update = jest.fn();
}
