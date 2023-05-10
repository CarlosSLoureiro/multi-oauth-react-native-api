declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_NAME: string;
      API_VERSION: string;
      API_PROTOCOL: string;
      API_HOST: string;
      API_PORT: number;

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
