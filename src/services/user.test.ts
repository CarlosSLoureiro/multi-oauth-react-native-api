import Activity from '@models/activity';
import User from '@models/user';

import UserService from '@services/user';
import type ActivityRepositoryInterface from '@repository/activity.interface';
import type UserRepositoryInterface from '@repository/user.interface';

import ValidationError from '@errors/validation.error';

import { Activities } from './activity.types';
import { type UserChangePasswordResponseInterface, type UserResponseInterface } from './user.types';

import Database from 'database';
import doenv from 'dotenv';

// Mock das dependências UserRepositoryInterface e ActivityRepositoryInterface
const mockUserRepository: jest.Mocked<UserRepositoryInterface> = {
  findUserById: jest.fn(),
  findUserByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
};

const mockActivityRepository: jest.Mocked<ActivityRepositoryInterface> = {
  create: jest.fn(),
  findManyByPage: jest.fn()
};

// Criando instâncias dos mocks
const userRepository = mockUserRepository as UserRepositoryInterface;
const activityRepository = mockActivityRepository as ActivityRepositoryInterface;

describe(`UserService`, () => {
  let userService: UserService;

  beforeEach(() => {
    doenv.config();
    Database.test();

    userService = new UserService(userRepository, activityRepository);
  });

  describe(`create`, () => {
    it(`should create a new user`, async () => {
      // Mockando a resposta do UserRepository.findUserByEmail para simular que não há nenhum usuário com o mesmo email
      mockUserRepository.findUserByEmail.mockResolvedValue(null);

      // Mockando a resposta do UserRepository.create para retornar um usuário criado
      const createdUser: User = new User();
      createdUser.id = 1;
      createdUser.name = `John Doe`;
      createdUser.email = `john@example.com`;
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Mockando a resposta do ActivityRepository.create
      mockActivityRepository.create.mockResolvedValue(null);

      const requestData = {
        name: `John Doe`,
        email: `john@example.com`,
        password: `password123`,
        confirmPassword: `password123`
      };

      const expectedResponse: UserResponseInterface = {
        id: 1,
        name: `John Doe`,
        email: `john@example.com`,
        picture: null,
        token: `generated_token`
      };

      const response = await userService.create(requestData);
      expect(response).toEqual(expectedResponse);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(`john@example.com`);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: `John Doe`,
        email: `john@example.com`,
        password: expect.any(String)
      });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(createdUser, Activities.LOGIN_WITH_PASSWORD);
    });

    it(`should throw a ValidationError if the email address is already registered`, async () => {
      // Mockando a resposta do UserRepository.findUserByEmail para simular que já existe um usuário com o mesmo email
      const existingUser: User = new User();
      existingUser.id = 1;
      existingUser.name = `Jane Doe`;
      existingUser.email = `john@example.com`;
      mockUserRepository.findUserByEmail.mockResolvedValue(existingUser);

      const requestData = {
        name: `John Doe`,
        email: `john@example.com`,
        password: `password123`,
        confirmPassword: `password123`
      };

      await expect(userService.create(requestData)).rejects.toThrowError(ValidationError);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(`john@example.com`);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });
  });

  describe(`changePassword`, () => {
    it.skip(`should change the user password`, async () => {
      const currentUser: User = new User();
      currentUser.id = 1;
      currentUser.name = `John Doe`;
      currentUser.email = `john@example.com`;
      currentUser.password = `old_password`;

      // Mockando a resposta do UserRepository.update para retornar o usuário com a nova senha
      const updatedUser: User = new User();
      updatedUser.id = 1;
      updatedUser.name = `John Doe`;
      updatedUser.email = `john@example.com`;
      updatedUser.password = `new_password`;
      mockUserRepository.update.mockResolvedValue(updatedUser);

      // Mockando a resposta do ActivityRepository.create
      mockActivityRepository.create.mockResolvedValue(null);

      const requestData = {
        currentPassword: `old_password`,
        newPassword: `new_password`,
        confirmPassword: `new_password`
      };

      const expectedResponse: UserChangePasswordResponseInterface = {
        token: `generated_token`
      };

      const response = await userService.changePassword(currentUser, requestData);
      expect(response).toEqual(expectedResponse);

      expect(mockUserRepository.update).toHaveBeenCalledWith(currentUser, {
        password: expect.any(String)
      });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(updatedUser, Activities.NEW_PASSWORD);
    });

    it.skip(`should throw a ValidationError if the current password is incorrect`, async () => {
      const currentUser: User = new User();
      currentUser.id = 1;
      currentUser.name = `John Doe`;
      currentUser.email = `john@example.com`;
      currentUser.password = `old_password`;

      const requestData = {
        currentPassword: `incorrect_password`,
        newPassword: `new_password`,
        confirmPassword: `new_password`
      };

      await expect(userService.changePassword(currentUser, requestData)).rejects.toThrowError(ValidationError);

      expect(mockUserRepository.update).not.toHaveBeenCalled();
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });
  });
});
