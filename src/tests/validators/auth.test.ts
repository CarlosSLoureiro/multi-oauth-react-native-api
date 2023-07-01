import type UserAuthRequest from "@requests/user.auth";

import ValidationError from "@errors/validation.error";

import AuthValidator from "@validators/auth";
import { type NextFunction, type Request } from "express";

describe(`AuthValidator`, () => {
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
          email: `loureiro.s.carlos@gmail.com`,
          password: `Password123`
        } satisfies UserAuthRequest
      };
      const validateFn = AuthValidator.validate();

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
            email: `carlosloureiro.xyz`,
            password: `Password123`
          } satisfies UserAuthRequest
        };
        const validateFn = AuthValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`"Email" must be a valid email`));
      });

      it(`if password is not set`, () => {
        // Arrange
        const request: Partial<Request> = {
          body: {
            email: `loureiro.s.carlos@gmail.com`
          } satisfies Partial<UserAuthRequest>
        };
        const validateFn = AuthValidator.validate();

        // Act
        validateFn(request as Request, undefined, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(new ValidationError(`The "Password" field is required`));
      });
    });
  });
});
