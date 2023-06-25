import { type User as UserModel } from '@models/user';

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENV: "production" | "development";

      API_NAME: string;
      API_VERSION: string;
      API_DOMAIN: string;
      API_PORT: number;
      API_SECRET: string;

      CLIENT_DOMAIN: string;
      CLIENT_SALT: string;

      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASS: string;
      MYSQL_BASE: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;

      TWITTER_CONSUMER_KEY: string;
      TWITTER_CONSUMER_SECRET: string;
    }
  }
}

export {};
