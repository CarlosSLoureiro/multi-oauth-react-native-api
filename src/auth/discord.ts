import { type OAuthProfile, OAuthProviders } from '@auth';

import { type Request } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-discord';
import { type VerifyCallback } from 'passport-oauth2';

export default abstract class DiscordAuth {
  private static getProfilePicture (profile: Strategy.Profile): string | null {
    if (`avatar` in profile) {
      return `https://cdn.discordapp.com/avatars/${profile.id as string}/${profile.avatar as string}.png?size=512`;
    } else {
      return null;
    }
  }

  private static readonly verify = (request: Request, accessToken: string, refreshToken: string, profile: Strategy.Profile, done: VerifyCallback): void => {
    const authUserProfile: OAuthProfile = {
      name: (`global_name` in profile) ? profile.global_name as string : profile.username,
      email: profile.email,
      picture: DiscordAuth.getProfilePicture(profile),
      provider: OAuthProviders.DISCORD
    };

    request.body = authUserProfile;
    done(null, authUserProfile);
  };

  public static config (): void {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;

    passport.use(
      new Strategy(
        {
          clientID: DISCORD_CLIENT_ID,
          clientSecret: DISCORD_CLIENT_SECRET,
          callbackURL: `${process.env.API_DOMAIN}/auth/discord/callback`,
          passReqToCallback: true,
          scope: [`identify`, `email`]
        },
        this.verify
      )
    );
  }
}
