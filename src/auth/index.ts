
import FacebookAuth from './facebook';
import GoogleAuth from './google';
import TwitterAuth from './twitter';

export enum OAuthProviders {
  GOOGLE = `google`,
  FACEBOOK = `facebook`,
  TWITTER = `twitter`
}

export interface OAuthProfile {
  name: string;
  email: string;
  picture?: string | null;
  provider: OAuthProviders;
}

export default abstract class Auth {
  public static config (): void {
    GoogleAuth.config();
    FacebookAuth.config();
    TwitterAuth.config();
  }
}
