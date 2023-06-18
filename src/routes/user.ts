import container from '@container';

import UserController from '@controllers/user';
import AuthenticatedMiddleware from '@middlewares/authenticated';

import swaggerDataUserChangePassword from "@docs/swagger/user/change-password";
import swaggerDataUserCreate from "@docs/swagger/user/create";

import RoutesUtils from './utils';

import UserChangePasswordValidator from '@validators/user.change-password';
import UserCreateValidator from '@validators/user.create';
import { type Router } from 'express';

export default abstract class UserRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const userController = container.get<UserController>(UserController);
    const athenticatedMiddleware = container.get<AuthenticatedMiddleware>(AuthenticatedMiddleware);

    swaggerPaths[`/user/create`] = swaggerDataUserCreate;
    router.post(`/user/create`, UserCreateValidator.validate(), RoutesUtils.getAsync(userController.create));

    swaggerPaths[`/user/password`] = swaggerDataUserChangePassword;
    router.patch(`/user/password`, athenticatedMiddleware.handle, UserChangePasswordValidator.validate(), RoutesUtils.getAsync(userController.changePassword));
  }
}
