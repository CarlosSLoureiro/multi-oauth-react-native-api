import type UserChangePasswordRequest from "@requests/user.change-password";

import handleValidator, { type ValidateInterface } from "./handle";
import messages from "./messages";

import Joi from "joi";

export default abstract class UserChangePasswordValidator {
  public static validate (): ValidateInterface {
    const schema = Joi.object<UserChangePasswordRequest>({
      currentPassword: Joi.string().label(`Current Password`),
      newPassword: Joi.string().label(`New Password`)
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)/)
        .message(`The "Password" must contain at least one letter and one number`)
        .required(),
      confirmPassword: Joi.string().label(`Confirm New Password`).required()
        .valid(Joi.ref(`password`)).messages({
          'any.only': `The "New Password" and "Confirm New Password" fields must match`
        })
    }).messages(messages);

    return handleValidator(schema);
  }
}
