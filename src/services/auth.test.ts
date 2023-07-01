import User from '@models/user';

import AuthService from '@services/auth';
import ActivityRepositoryMock from '@repository/activity.mock';
import UserRepositoryMock from '@repository/user.mock';

import { type OAuthProfile, OAuthProviders } from '@auth';

import GenericError from '@errors/generic.error';
import ValidationError from '@errors/validation.error';

import getHashedUserPassword from '@utils/user-password/get';
import getToken from '@utils/user-password/token';

import { Activities } from './activity.types';
import { type AuthResponseInterface, type UserDataResponseInterface } from './auth.types';

import Database from 'database';
import doenv from 'dotenv';

describe(`AuthService`, () => {
  let mockUserRepository: UserRepositoryMock;
  let mockActivityRepository: ActivityRepositoryMock;
  let authService: AuthService;
  const expressaoJWT = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

  beforeEach(() => {
    doenv.config();
    Database.test();

    mockUserRepository = new UserRepositoryMock();
    mockActivityRepository = new ActivityRepositoryMock();
    authService = new AuthService(mockUserRepository, mockActivityRepository);
  });

  describe(`authenticateWithPassword`, () => {
    it(`should authenticate a user with password`, async () => {
      // Arrange
      const email = `loureiro.s.carlos@gmail.com`;
      const password = `password123`;
      const user: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email,
        password: getHashedUserPassword(password)
      });
      const expectedResponse: UserDataResponseInterface = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: getToken(user)
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(user);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await authService.authenticateWithPassword(email, password);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`id`, expectedResponse.id);
      expect(response).toHaveProperty(`name`, expectedResponse.name);
      expect(response).toHaveProperty(`email`, expectedResponse.email);
      expect(response).toHaveProperty(`picture`, expectedResponse.picture);
      expect(response.token).toMatch(expressaoJWT);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockActivityRepository.create).toHaveBeenCalledWith(user, Activities.LOGIN_WITH_PASSWORD);
    });

    it(`should throw a ValidationError if the user is not found`, async () => {
      // Arrange
      const email = `nonexistent@gmail.com`;
      const password = `password123`;

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(null);

      // Act
      try {
        await authService.authenticateWithPassword(email, password);
        fail(`authenticateWithPassword must throw ValidationError`);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toEqual(`User not found`);
      }

      // Assert
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });

    it(`should throw a ValidationError if the user does not have a registered password`, async () => {
      // Arrange
      const email = `loureiro.s.carlos@gmail.com`;
      const password = `password123`;
      const user: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email,
        password: null
      });

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(user);

      // Act
      try {
        await authService.authenticateWithPassword(email, password);
        fail(`authenticateWithPassword must throw ValidationError`);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toEqual(`The user does not have a registered password`);
      }

      // Assert
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });

    it(`should throw a ValidationError if the password is incorrect`, async () => {
      // Arrange
      const email = `loureiro.s.carlos@gmail.com`;
      const password = `incorrect_password`;
      const user: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email,
        password: getHashedUserPassword(`password123`)
      });

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(user);

      // Act
      try {
        await authService.authenticateWithPassword(email, password);
        fail(`authenticateWithPassword must throw ValidationError`);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toEqual(`Wrong user password`);
      }

      // Assert
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockActivityRepository.create).not.toHaveBeenCalled();
    });
  });

  describe(`authenticateWithOAuthProfile`, () => {
    it(`should create and authenticate a user with OAuth profile if user is not registed`, async () => {
      // Arrange
      const profile: OAuthProfile = {
        email: `loureiro.s.carlos@gmail.com`,
        name: `Carlos Loureiro`,
        picture: `profile_picture.png`,
        provider: OAuthProviders.GOOGLE
      };
      const user: User = new User({
        id: 1,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      });
      const expectedResponse: AuthResponseInterface = {
        action: `auth`,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: getToken(user)
        }
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(user);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await authService.authenticateWithOAuthProfile(profile);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`action`, expectedResponse.action);
      expect(response).toHaveProperty(`data.id`, expectedResponse.data.id);
      expect(response).toHaveProperty(`data.name`, expectedResponse.data.name);
      expect(response).toHaveProperty(`data.email`, expectedResponse.data.email);
      expect(response).toHaveProperty(`data.picture`, expectedResponse.data.picture);
      expect(response.data.token).toMatch(expressaoJWT);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(profile.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: profile.name,
        email: profile.email,
        picture: profile.picture || null
      });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(user, Activities.LOGIN_WITH_PROVIDER.replace(`@provider`, profile.provider));
    });

    it(`should authenticate a user with OAuth profile`, async () => {
      // Arrange
      const profile: OAuthProfile = {
        email: `loureiro.s.carlos@gmail.com`,
        name: `Carlos Loureiro`,
        picture: `profile_picture.png`,
        provider: OAuthProviders.GOOGLE
      };
      const user: User = new User({
        id: 1,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      });
      const expectedResponse: AuthResponseInterface = {
        action: `auth`,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: getToken(user)
        }
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(user);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await authService.authenticateWithOAuthProfile(profile);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`action`, expectedResponse.action);
      expect(response).toHaveProperty(`data.id`, expectedResponse.data.id);
      expect(response).toHaveProperty(`data.name`, expectedResponse.data.name);
      expect(response).toHaveProperty(`data.email`, expectedResponse.data.email);
      expect(response).toHaveProperty(`data.picture`, expectedResponse.data.picture);
      expect(response.data.token).toMatch(expressaoJWT);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(profile.email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockActivityRepository.create).toHaveBeenCalledWith(user, Activities.LOGIN_WITH_PROVIDER.replace(`@provider`, profile.provider));
    });

    it(`should update the user picture if the profile picture is provided`, async () => {
      // Arrange
      const profile: OAuthProfile = {
        email: `loureiro.s.carlos@gmail.com`,
        name: `Carlos Loureiro`,
        picture: `new_profile_picture.png`,
        provider: OAuthProviders.GOOGLE

      };
      const user: User = new User({
        id: 1,
        name: profile.name,
        email: profile.email,
        picture: null
      });
      const updatedUser: User = new User({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: profile.picture
      });
      const expectedResponse: AuthResponseInterface = {
        action: `auth`,
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          picture: updatedUser.picture,
          token: getToken(updatedUser)
        }
      };

      // Mock
      mockUserRepository.findUserByEmail.mockResolvedValue(user);
      mockUserRepository.update.mockResolvedValue(updatedUser);
      mockActivityRepository.create.mockResolvedValue(null);

      // Act
      const response = await authService.authenticateWithOAuthProfile(profile);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`action`, expectedResponse.action);
      expect(response).toHaveProperty(`data.id`, expectedResponse.data.id);
      expect(response).toHaveProperty(`data.name`, expectedResponse.data.name);
      expect(response).toHaveProperty(`data.email`, expectedResponse.data.email);
      expect(response).toHaveProperty(`data.picture`, expectedResponse.data.picture);
      expect(response.data.token).toMatch(expressaoJWT);

      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(profile.email);
      expect(mockUserRepository.update).toHaveBeenCalledWith(user, { picture: profile.picture });
      expect(mockActivityRepository.create).toHaveBeenCalledWith(updatedUser, Activities.LOGIN_WITH_PROVIDER.replace(`@provider`, profile.provider));
    });
  });

  describe(`verifyUserByIdAndPassword`, () => {
    it(`should verify a user by ID and password`, async () => {
      // Arrange
      const id = 1;
      const hasedPassword = getHashedUserPassword(`password123`);
      const user: User = new User({
        id,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: hasedPassword
      });

      // Mock
      mockUserRepository.findUserById.mockResolvedValue(user);

      // Act
      const response = await authService.verifyUserByIdAndPassword(id, hasedPassword);

      // Assert
      expect(response).toBeDefined();
      expect(response).toBe(user);
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(id);
    });

    it(`should throw a GenericError if the user is not found`, async () => {
      // Arrange
      const id = 1;
      const password = `password123`;

      // Mock
      mockUserRepository.findUserById.mockResolvedValue(null);

      // Act
      try {
        await authService.verifyUserByIdAndPassword(id, password);
        fail(`verifyUserByIdAndPassword must throw GenericError`);
      } catch (error) {
        expect(error).toBeInstanceOf(GenericError);
        expect(error.message).toEqual(`User not found`);
      }

      // Assert
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(id);
    });

    it(`should throw a GenericError if the password is incorrect`, async () => {
      // Arrange
      const id = 1;
      const password = `incorrect_password`;
      const user: User = new User({
        id,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        password: getHashedUserPassword(`password123`)
      });

      // Mock
      mockUserRepository.findUserById.mockResolvedValue(user);

      // Act
      try {
        await authService.verifyUserByIdAndPassword(id, password);
        fail(`verifyUserByIdAndPassword must throw GenericError`);
      } catch (error) {
        expect(error).toBeInstanceOf(GenericError);
        expect(error.message).toEqual(`Wrong user password`);
      }

      // Assert
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(id);
    });
  });

  describe(`check`, () => {
    it(`should return the user data without the token`, async () => {
      // Arrange
      const user: User = new User({
        id: 1,
        name: `Carlos Loureiro`,
        email: `loureiro.s.carlos@gmail.com`,
        picture: `profile_picture.png`
      });
      const expectedResponse: Omit<UserDataResponseInterface, 'token'> = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture
      };

      // Act
      const response = await authService.check(user);

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`id`, expectedResponse.id);
      expect(response).toHaveProperty(`name`, expectedResponse.name);
      expect(response).toHaveProperty(`email`, expectedResponse.email);
      expect(response).toHaveProperty(`picture`, expectedResponse.picture);
    });
  });

  describe(`error`, () => {
    it(`should return an object with the error message`, () => {
      // Arrange
      const message = `Could not complete the authentication`;
      const expectedResponse = { error: message };

      // Act
      const response = authService.error();

      // Assert
      expect(response).toBeDefined();
      expect(response).toHaveProperty(`error`, expectedResponse.error);
    });
  });
});
