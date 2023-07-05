import { type OAuthProfile, OAuthProviders } from '@auth';

import { type Request } from 'express';
import passport, { type Profile } from 'passport';
import { Strategy } from 'passport-github2';

export default abstract class GithubAuth {
  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Profile, done: (a, b: OAuthProfile) => void): void => {
    const authUserProfile: OAuthProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null,
      provider: OAuthProviders.GITHUB
    };

    request.body = authUserProfile;
    done(null, authUserProfile);
  };

  public static config (): void {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

    passport.use(
      new Strategy(
        {
          clientID: GITHUB_CLIENT_ID,
          clientSecret: GITHUB_CLIENT_SECRET,
          callbackURL: `${process.env.API_DOMAIN}/auth/github/callback`,
          passReqToCallback: true
        },
        this.verify
      )
    );
  }
}
