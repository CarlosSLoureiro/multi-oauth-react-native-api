import { config as configEnvironment } from 'dotenv';
import express, { type Application, Router } from 'express';

export default class App {
  private readonly app: Application = express();
  private readonly router: Router = Router();

  constructor () {
    configEnvironment();

    this.router.get(`/`, (req, res) => {
      res.send(`Hello World!`);
    });

    this.app.use(this.router);

    this.app.listen(process.env.SERVER_PORT, () => {
      console.info(`Api started ${process.env.SERVER_PROTOCOL}${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  }
}
