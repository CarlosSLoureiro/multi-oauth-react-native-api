import 'reflect-metadata';

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

    void this.database.init();

    this.app.use(this.router);

    Routes.init(this.router);

    this.app.listen(process.env.API_PORT, () => {
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `${process.env.API_NAME} started at ${process.env.API_PROTOCOL}${process.env.API_HOST}:${process.env.API_PORT}`, `\x1b[0m`);
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `Access ${process.env.API_PROTOCOL}${process.env.API_HOST}:${process.env.API_PORT}/swagger for API documentation`, `\x1b[0m`);
    });
  }
}
