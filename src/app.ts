import 'reflect-metadata';

import Routes from '@routes';

import doenv from 'dotenv';
import express, { type Application, Router } from 'express';

export default class App {
  private readonly app: Application = express();
  private readonly router: Router = Router();

  constructor () {
    doenv.config();

    this.app.use(this.router);

    Routes.init(this.router);

    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `${process.env.NAME} started at ${process.env.SERVER_PROTOCOL}${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`, `\x1b[0m`);
      console.log(`\x1b[1m\x1b[30m\x1b[47m`, `Access ${process.env.SERVER_PROTOCOL}${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/swagger for API documentation`, `\x1b[0m`);
    });
  }
}
