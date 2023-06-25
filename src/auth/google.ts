import { type OAuth2Profile } from '@auth';

import { type Request } from 'express';
import passport, { type Profile } from 'passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth2';

export default abstract class GoogleAuth {
  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): void => {
    const authUserProfile: OAuth2Profile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null
    };

    request.body = authUserProfile;
    done(null, authUserProfile);
  };

  public static config (): void {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

    passport.use(
      new Strategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.API_DOMAIN}/auth/google/callback`,
          passReqToCallback: true
        },
        this.verify
      )
    );
  }
}
