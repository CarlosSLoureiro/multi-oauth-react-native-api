import GenericError from "./generic.error";
import SequelizeError from "./sequelize.error";
import ValidationError from "./validation.error";

import * as Sentry from '@sentry/node';
import { type NextFunction, type Request, type Response } from "express";

export default (error: any, request: Request, response: Response, next: NextFunction): void => {
  if (error instanceof GenericError) {
    response.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof ValidationError) {
    response.status(error.statusCode).json({ error: error.message, fields: error.fields });
  } else if (error instanceof SequelizeError) {
    const errorMessage = `An error occurred during a database query`;

    console.log(`${errorMessage}:`, error);

    if (process.env.API_ENV === `development`) {
      response.status(500).json({ error: errorMessage, message: error.message });
    } else {
      Sentry.captureException(error);
      response.status(500).json({ error: errorMessage });
    }
  } else {
    const errorMessage = `Unhandled Server Error`;

    console.log(`${errorMessage}:`, error);

    if (process.env.API_ENV === `development`) {
      response.status(500).json({ error: errorMessage, message: error.message });
    } else {
      Sentry.captureException(error);
      response.status(500).json({ error: errorMessage });
    }
  }
};
