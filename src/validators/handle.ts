import { type NextFunction, type Request, type Response } from "express";
import type Joi from "joi";

export type ValidateInterface = (request: Request, response: Response, next: NextFunction) => void;

export default (schema: Joi.ObjectSchema): ValidateInterface => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      let validationResult: Joi.ValidationResult;

      if (request.body) {
        validationResult = schema.validate(request.body);
      } else {
        validationResult = schema.validate(request.query);
      }

      const { error } = validationResult;

      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(`, `);
        let fields = [];
        error.details.forEach((detail) => {
          fields = fields.concat(detail.path);
        });

        console.log(validationResult);
        response.status(400).json({ error: errorMessage, fields });
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  };
};
