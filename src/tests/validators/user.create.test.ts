import type UserCreateRequest from "@requests/user.create";

import ValidationError from "@errors/validation.error";

import UserCreateValidator from "@validators/user.create";
import { type NextFunction, type Request } from "express";

describe(`UserCreateValidator`, () => {
  let mockNext: jest.Mocked<NextFunction>;

  beforeEach(() => {
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe(`validate`, () => {
    it(`should call next function if validation succeeds`, () => {
      // Arrange
      const request: Partial<Request> = {
        body: {
          name: `Carlos Loureiro`,
          email: `loureiro.s.carlos@gmail.com`,
          password: `Password123`,
          confirmPassword: `Password123`
        } satisfies UserCreateRequest
      };
      const validateFn = UserCreateValidator.validate();

      // Act
      validateFn(request as Request, undefined, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith();
    });

    describe(`should call next function with ValidationError if validation fail`, () => {
      it(`if email is not valid`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            name: `Carlos Loureiro`,
            email: `carlosloureiro.xyz`,
            password: `Password123`,
            confirmPassword: `Password123`
          } satisfies UserCreateRequest
        };
        const validateFn = UserCreateValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`"Email" must be a valid email`));
      });

      it(`if password is less than 8 characters`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            name: `Carlos Loureiro`,
            email: `loureiro.s.carlos@gmail.com`,
            password: `x234567`,
            confirmPassword: `x234567`
          } satisfies UserCreateRequest
        };
        const validateFn = UserCreateValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`"Password" length must be at least 8 characters long`));
      });

      it(`if password is only words`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            name: `Carlos Loureiro`,
            email: `loureiro.s.carlos@gmail.com`,
            password: `qwertyuiop`,
            confirmPassword: `qwertyuiop`
          } satisfies UserCreateRequest
        };
        const validateFn = UserCreateValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "Password" must contain at least one letter and one number`));
      });

      it(`if password is only numbers`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            name: `Carlos Loureiro`,
            email: `loureiro.s.carlos@gmail.com`,
            password: `987654321`,
            confirmPassword: `987654321`
          } satisfies UserCreateRequest
        };
        const validateFn = UserCreateValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "Password" must contain at least one letter and one number`));
      });

      it(`if password does not match`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            name: `Carlos Loureiro`,
            email: `loureiro.s.carlos@gmail.com`,
            password: `Password123`,
            confirmPassword: `Passwor`
          } satisfies UserCreateRequest
        };
        const validateFn = UserCreateValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "Password" and "Confirm Password" fields must match`));
      });
    });
  });
});
