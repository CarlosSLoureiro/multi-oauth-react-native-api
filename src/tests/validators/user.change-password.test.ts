import type UserChangePasswordRequest from "@requests/user.change-password";

import ValidationError from "@errors/validation.error";

import UserChangePasswordValidator from "@validators/user.change-password";
import { type NextFunction, type Request } from "express";

describe(`UserChangePasswordValidator`, () => {
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
          currentPassword: `old_password`,
          newPassword: `new_password123`,
          confirmPassword: `new_password123`
        } satisfies UserChangePasswordRequest
      };
      const validateFn = UserChangePasswordValidator.validate();

      // Act
      validateFn(request as Request, undefined, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith();
    });

    describe(`should call next function with ValidationError if validation fail`, () => {
      it(`if password is less than 8 characters`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            currentPassword: `old_password`,
            newPassword: `x234567`,
            confirmPassword: `x234567`
          } satisfies UserChangePasswordRequest
        };
        const validateFn = UserChangePasswordValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`"New Password" length must be at least 8 characters long`));
      });

      it(`if password is only words`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            currentPassword: `old_password`,
            newPassword: `qwertyuiop`,
            confirmPassword: `qwertyuiop`
          } satisfies UserChangePasswordRequest
        };
        const validateFn = UserChangePasswordValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "New Password" must contain at least one letter and one number`));
      });

      it(`if password is only numbers`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            currentPassword: `old_password`,
            newPassword: `987654321`,
            confirmPassword: `987654321`
          } satisfies UserChangePasswordRequest
        };
        const validateFn = UserChangePasswordValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "New Password" must contain at least one letter and one number`));
      });

      it(`if password does not match`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            currentPassword: `old_password`,
            newPassword: `Password123`,
            confirmPassword: `Passwor`
          } satisfies UserChangePasswordRequest
        };
        const validateFn = UserChangePasswordValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "New Password" and "Confirm New Password" fields must match`));
      });
    });
  });
});
