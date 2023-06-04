import container from '@container';

import UserController from '@controllers/user';

import swaggerData from "@docs/swagger/user/create";

import RoutesUtils from './utils';

import UserCreateValidator from '@validators/user.create';
import { type Router } from 'express';

export default abstract class UserRoutes {
  public static config (router: Router, swaggerPaths: object): void {
    const userController = container.get<UserController>(UserController);

    swaggerPaths[`/user/create`] = swaggerData;
    router.post(`/user/create`, UserCreateValidator.validate(), RoutesUtils.getAsync(userController.create));
  }
}
