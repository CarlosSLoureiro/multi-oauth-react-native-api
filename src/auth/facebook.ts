
import { type OAuthProfile, OAuthProviders } from '@auth';

import { type Request } from 'express';
import passport, { type Profile } from 'passport';
import { Strategy } from 'passport-facebook';

export default abstract class FacebookAuth {
  private static readonly getProfilePicture = async (profile: Profile, accessToken: string): Promise<string | undefined> => {
    const api = `https://graph.facebook.com/v13.0/${profile.id}/picture?width=200&height=200&redirect=false&access_token=${accessToken}`;

    const response = await fetch(api);

    try {
      const data = await response.json();
      return data?.data?.url || undefined;
    } catch (error) {
      return undefined;
    }
  };

  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Profile, done: any): void => {
    const authUserProfile: OAuthProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      provider: OAuthProviders.FACEBOOK
    };

    FacebookAuth.getProfilePicture(profile, accessToken)
      .then(picture => {
        authUserProfile.picture = picture;
      })
      .finally(() => {
        request.body = authUserProfile;
        done(null, authUserProfile);
      });
  };

  public static config (): void {
    const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

    passport.use(
      new Strategy(
        {
          clientID: FACEBOOK_CLIENT_ID,
          clientSecret: FACEBOOK_CLIENT_SECRET,
          /* The callback url must be https for facebook */
          callbackURL: `${process.env.API_DOMAIN.replace(`http://`, `https://`)}/auth/facebook/callback`,
          passReqToCallback: true,
          profileFields: [`id`, `displayName`, `photos`, `email`]
        },
        this.verify
      )
    );
  }
}
