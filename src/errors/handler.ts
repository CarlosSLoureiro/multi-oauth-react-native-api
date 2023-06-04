import GenericError from "./generic.error";
import SequelizeError from "./sequelize.error";

import { type NextFunction, type Request, type Response } from "express";

export default (error: any, request: Request, response: Response, next: NextFunction): void => {
  if (error instanceof GenericError) {
    response.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof SequelizeError) {
    const errorMessage = `An error occurred during a database query`;

    // TODO: send request & error to sentry ...
    console.log(errorMessage, error);

    if (process.env.API_ENV === `development`) {
      response.status(500).json({ error: errorMessage, message: error.message });
    } else {
      response.status(500).json({ error: errorMessage });
    }
  } else {
    const errorMessage = `Unhandled Server Error`;

    // TODO: send request & error to sentry ...
    console.log(errorMessage, error);

    if (process.env.API_ENV === `development`) {
      response.status(500).json({ error: errorMessage, message: error.message });
    } else {
      response.status(500).json({ error: errorMessage });
    }
  }
};
