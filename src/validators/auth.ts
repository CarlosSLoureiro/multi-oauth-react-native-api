import type UserCreateRequest from "@requests/user.create";

import handleValidator, { type ValidateInterface } from "./handle";
import messages from "./messages";

import Joi from "joi";

export default abstract class AuthValidator {
  public static validate (): ValidateInterface {
    const schema = Joi.object<UserCreateRequest>({
      email: Joi.string().label(`Email`).email().required(),
      password: Joi.string().label(`Password`).required()
    }).messages(messages);

    return handleValidator(schema);
  }
}
