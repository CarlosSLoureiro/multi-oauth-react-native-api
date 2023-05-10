import { type Request } from 'express';
import passport, { type Profile } from 'passport';
import { OAuth2Strategy, type VerifyFunction } from 'passport-google-oauth';

export default abstract class GoogleAuth {
  private static readonly verify = (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction): void => {
    req.body = profile;
    done(null, profile);
  };

  public static config (): void {
    passport.use(new OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_PROTOCOL}${process.env.API_HOST}:${process.env.API_PORT}/auth/google/callback`,
        passReqToCallback: true
      },
      this.verify
    ));
  }
}
