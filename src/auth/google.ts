import { type OAuth2Profile } from '@auth';

import { type Request } from 'express';
import passport from 'passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth2';

export default abstract class GoogleAuth {
  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: OAuth2Profile, done: VerifyCallback): void => {
    request.body = profile;
    done(null, profile);
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
