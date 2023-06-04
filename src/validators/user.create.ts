import handleValidator, { type ValidateInterface } from "./handle";
import messages from "./messages";

import Joi from "joi";

export default abstract class UserCreateValidator {
  public static validate (): ValidateInterface {
    const schema = Joi.object({
      name: Joi.string().label(`Name`).required(),
      email: Joi.string().label(`Email`).email().required(),
      password: Joi.string().label(`Password`).required(),
      confirmPassword: Joi.string().label(`Confirm Password`).required()
        .valid(Joi.ref(`password`)).messages({
          'any.only': `The "Password" and "Confirm Password" fields must match`
        })
    }).messages(messages);

    return handleValidator(schema);
  }
}
