
import FacebookAuth from './facebook';
import GoogleAuth from './google';
import TwitterAuth from './twitter';

export interface OAuth2Profile {
  name: string;
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
