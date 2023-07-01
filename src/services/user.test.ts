import User from '@models/user';

import type UserChangePasswordRequest from '@requests/user.change-password';
import type UserCreateRequest from '@requests/user.create';
import UserService from '@services/user';
import ActivityRepositoryMock from '@repository/activity.mock';
import UserRepositoryMock from '@repository/user.mock';

import ValidationError from '@errors/validation.error';

import getHashedUserPassword from '@utils/user-password/get';
import getToken from '@utils/user-password/token';

import { Activities } from './activity.types';
import { type UserResponseInterface } from './user.types';

import Database from 'database';
import doenv from 'dotenv';

describe(`UserService`, () => {
  let mockUserRepository: UserRepositoryMock;
  let mockActivityRepository: ActivityRepositoryMock;
  let userService: UserService;
  const expressaoJWT = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

  beforeEach(() => {
    doenv.config();
    Database.test();

    mockUserRepository = new UserRepositoryMock();
    mockActivityRepository = new ActivityRepositoryMock();

    userService = new UserService(mockUserRepository, mockActivityRepository);
  });

  describe(`create`, () => {
    it(`should create a new user`, async () => {
      // Arrange
      const requestData = {
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: `password123`,
        confirmPassword: `password123`
      };
      const createdUser: User = new User({
        id: 1,
        name: requestData.name,
        email: requestData.email,
        password: getHashedUserPassword(requestData.password)
      });
      const expectedResponse: UserResponseInterface = {
        id: 1,
        name: requestData.name,
        email: requestData.email,
        picture: null,
        token: getToken(createdUser)
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await userService.create(requestData);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`id`, expectedResponse.id);
      expect(response).toHaveProperty(`name`, expectedResponse.name);
      expect(response).toHaveProperty(`email`, expectedResponse.email);
      expect(response).toHaveProperty(`picture`, expectedResponse.picture);
      expect(response.token).toMatch(expressaoJWT);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(requestData.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: requestData.name,
        email: requestData.email,
        password: expect.any(String)
      });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(createdUser, Activities.LOGIN_WITH_PASSWORD);
    });

    it(`should throw a ValidationError if the email address is already registered`, async () => {
      // Arrange
      const existingUser: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: getHashedUserPassword(`password123`)
      });
      const requestData: UserCreateRequest = {
        name: `New Carlos Loureiro`,
        email: existingUser.email,
        password: `password123`,
        confirmPassword: `password123`
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(existingUser);

      // Act
      await expect(userService.create(requestData)).rejects.toThrowError(ValidationError);

      // Assert
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(existingUser.email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });
  });

  describe(`changePassword`, () => {
    it(`should change the user password`, async () => {
      // Arrange
      const currentUser: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: getHashedUserPassword(`old_password`)
      });
      const requestData: UserChangePasswordRequest = {
        currentPassword: `old_password`,
        newPassword: `new_password`,
        confirmPassword: `new_password`
      };
      const updatedUser: User = new User({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        password: getHashedUserPassword(requestData.newPassword)
      });

      // Mock
      mockUserRepository.update.mockResolvedValue(updatedUser);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await userService.changePassword(currentUser, requestData);

      // Assert
      expect(response).toBeDefined();
      expect(response.token).toMatch(expressaoJWT);
      expect(mockUserRepository.update).toHaveBeenCalledWith(currentUser, { password: expect.any(String) });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(updatedUser, Activities.NEW_PASSWORD);
    });

    it(`should throw a ValidationError if the current password is incorrect`, async () => {
      // Arramge
      const currentUser: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: getHashedUserPassword(`old_password`)
      });
      const requestData: UserChangePasswordRequest = {
        currentPassword: `incorrect_password`,
        newPassword: `new_password`,
        confirmPassword: `new_password`
      };

      // Act
      await expect(userService.changePassword(currentUser, requestData)).rejects.toThrowError(ValidationError);

      // Assert
      expect(mockUserRepository.update).not.toHaveBeenCalled();
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });
  });
});
