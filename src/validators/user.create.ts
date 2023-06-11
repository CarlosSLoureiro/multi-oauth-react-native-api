import type UserCreateRequest from "@requests/user.create";

import handleValidator, { type ValidateInterface } from "./handle";
import messages from "./messages";

import Joi from "joi";

export default abstract class UserCreateValidator {
  public static validate (): ValidateInterface {
    const schema = Joi.object<UserCreateRequest>({
      name: Joi.string().label(`Name`).required(),
      email: Joi.string().label(`Email`).email().required(),
      password: Joi.string().label(`Password`)
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)/)
        .message(`The "Password" must contain at least one letter and one number`)
        .required(),
      confirmPassword: Joi.string().label(`Confirm Password`).required()
        .valid(Joi.ref(`password`)).messages({
          'any.only': `The "Password" and "Confirm Password" fields must match`
        })
    }).messages(messages);

    return handleValidator(schema);
  }
}
