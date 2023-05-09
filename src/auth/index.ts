
import GoogleAuth from './google';

import { type Application, type Request, type Response } from 'express';

export default abstract class Auth {
  public static init (app: Application): void {
    app.get(`/auth/error`, (request: Request, response: Response) => response.json({ status: `Oauth login falied!` }));

    GoogleAuth.init(app);
  }
}
