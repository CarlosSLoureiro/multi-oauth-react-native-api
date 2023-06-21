
import GoogleAuth from './google';

import { type Profile } from 'passport';

export interface OAuth2Profile extends Profile {
  picture: string;
}

export default abstract class Auth {
  public static config (): void {
    GoogleAuth.config();
  }
}
