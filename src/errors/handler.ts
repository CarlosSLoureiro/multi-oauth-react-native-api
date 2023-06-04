import GenericError from "./generic.error";
import SequelizeError from "./sequelize.error";

import { type NextFunction, type Request, type Response } from "express";

export default (error: any, request: Request, response: Response, next: NextFunction): void => {
  if (error instanceof GenericError) {
    response.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof SequelizeError) {
    console.log(error);
    response.status(500).json({ error: error.message });
  } else {
    // TODO: send request & error to sentry ...
    response.status(500).json({ error: `Unhandled Server Error` });
  }
};
