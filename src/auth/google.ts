import { type Application } from "express";
import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

export default abstract class GoogleAuth {
  private static readonly route = `google`;

  public static config (app: Application): void {
    passport.use(new OAuth2Strategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_PROTOCOL}${process.env.API_HOST}:${process.env.API_PORT}/auth/${this.route}/callback`,
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      req.body = profile;
      done(null, profile);
    }
    ));

    app.get(`/auth/${this.route}`, passport.authenticate(`google`, { scope: [`profile`, `email`], session: false }));

    app.get(`/auth/${this.route}/callback`, passport.authenticate(`google`, { failureRedirect: `/auth/error`, session: false }),
      function (req, res) {
        res.json(req.body);
      });
  }
}
