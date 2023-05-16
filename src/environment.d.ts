declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENV: "production" | "development";

      API_NAME: string;
      API_VERSION: string;
      API_PORT: number;

      CLIENT_DOMAIN: string;

      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASS: string;
      MYSQL_BASE: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
