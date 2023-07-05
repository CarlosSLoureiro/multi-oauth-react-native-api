
import FacebookAuth from './facebook';
import GoogleAuth from './google';
import LinkedinAuth from './linkedin';
import TwitterAuth from './twitter';

export enum OAuthProviders {
  GOOGLE = `google`,
  FACEBOOK = `facebook`,
  TWITTER = `twitter`,
  LINKEDIN = `linkedin`
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
    LinkedinAuth.config();
  }
}
