
import FacebookAuth from './facebook';
import GoogleAuth from './google';
import TwitterAuth from './twitter';

import { type Profile } from 'passport';

export interface OAuth2Profile extends Profile {
  email: string;
  picture?: string | null;
}

export default abstract class Auth {
  public static config (): void {
    GoogleAuth.config();
    FacebookAuth.config();
    TwitterAuth.config();
  }
}
