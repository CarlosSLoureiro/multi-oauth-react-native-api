import { type OAuthProfile, OAuthProviders } from '@auth';

/*
    Due to lib passport-twitter having a dependency with a critical issue,
    I chose to use an alternative made by another github user.
    Ref. https://github.com/jaredhanson/passport-twitter/issues/107
*/
import { Strategy } from '@passport-js/passport-twitter';
import { type Request } from 'express';
import passport, { type Profile } from 'passport';

export default abstract class TwitterAuth {
  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Profile, done: (a, b: OAuthProfile) => void): void => {
    const authUserProfile: OAuthProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value.replace(`_normal`, ``) : null,
      provider: OAuthProviders.TWITTER
    };

    request.body = authUserProfile;

    done(null, authUserProfile);
  };

  public static config (): void {
    const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;
    passport.use(
      new Strategy(
        {
          consumerKey: TWITTER_CONSUMER_KEY,
          consumerSecret: TWITTER_CONSUMER_SECRET,
          includeEmail: true,
          callbackURL: `${process.env.API_DOMAIN}/auth/twitter/callback`,
          passReqToCallback: true
        },
        this.verify
      )
    );
  }
}
