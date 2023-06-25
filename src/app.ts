import 'reflect-metadata';

import Auth from '@auth';
import Routes from '@routes';

import errorsHandler from '@errors/handler';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import Database from 'database';
import doenv from 'dotenv';
import express, { type Application, Router } from 'express';
import session from 'express-session';

export default class App {
  private readonly app: Application = express();
  private readonly router: Router = Router();
  private readonly database: Database = new Database();

  constructor () {
    doenv.config();

    void this.database.config();

    Auth.config();

    Routes.config(this.router);

    this.app.use(cors({
      origin: `*`
    }));

    this.app.use(session({ secret: process.env.API_SECRET }));

    this.app.use(express.json());

    this.app.use(cookieParser());

    this.app.use(this.router);

    this.app.use(errorsHandler);

    this.app.listen(process.env.API_PORT, () => {
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `${process.env.API_NAME} started`, `\x1b[0m`);
      if (process.env.API_ENV === `development`) {
        console.log(`\x1b[1m\x1b[30m\x1b[47m`, `Access GET /swagger for API documentation`, `\x1b[0m`);
      }
    });
  }
}
