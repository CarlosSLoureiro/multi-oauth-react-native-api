import { type OAuthProfile, OAuthProviders } from '@auth';

import { type Request } from 'express';
import passport, { type Profile } from 'passport';
import { Strategy } from 'passport-linkedin-oauth2';

export default abstract class LinkedinAuth {
  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Profile, done: (a, b: OAuthProfile) => void): void => {
    const authUserProfile: OAuthProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: (profile.photos && profile.photos.length > 0) ? profile.photos[profile.photos.length - 1].value : null,
      provider: OAuthProviders.LINKEDIN
    };

    request.body = authUserProfile;
    done(null, authUserProfile);
  };

  public static config (): void {
    const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET } = process.env;

    passport.use(
      new Strategy(
        {
          clientID: LINKEDIN_CLIENT_ID,
          clientSecret: LINKEDIN_CLIENT_SECRET,
          callbackURL: `${process.env.API_DOMAIN}/auth/linkedin/callback`,
          scope: [`r_emailaddress`, `r_liteprofile`],
          passReqToCallback: true
        },
        this.verify
      )
    );
  }
}
