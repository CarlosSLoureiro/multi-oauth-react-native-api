import express, { type Application, Router } from 'express';

export default class App {
  private readonly app: Application = express();
  private readonly port = 3000;
  private readonly router: Router = Router();

  constructor () {
    this.router.get(`/`, (req, res) => {
      res.send(`Hello World!`);
    });

    this.app.use(this.router);

    this.app.listen(this.port, () => {
      console.info(`Application started http://localhost:${this.port}`);
    });
  }
}
