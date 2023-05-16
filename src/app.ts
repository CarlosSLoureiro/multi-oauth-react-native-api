import 'reflect-metadata';

import Auth from '@auth';
import Routes from '@routes';

import Database from 'database';
import doenv from 'dotenv';
import express, { type Application, Router } from 'express';

export default class App {
  private readonly app: Application = express();
  private readonly router: Router = Router();
  private readonly database: Database = new Database();

  constructor () {
    doenv.config();

    void this.database.config();

    Auth.config();

    Routes.config(this.router);

    this.app.use(express.json());

    this.app.use(this.router);

    this.app.listen(process.env.API_PORT, () => {
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `${process.env.API_NAME} started`, `\x1b[0m`);
      if (process.env.API_ENV === `development`) {
        console.log(`\x1b[1m\x1b[30m\x1b[47m`, `Access GET /swagger for API documentation`, `\x1b[0m`);
      }
    });
  }
}
