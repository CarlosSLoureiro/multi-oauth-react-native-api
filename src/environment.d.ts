declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAME: string;
      VERSION: string;
      SERVER_PROTOCOL: string;
      SERVER_HOST: string;
      SERVER_PORT: number;
      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASS: string;
      MYSQL_BASE: string;
    }
  }
}

export {};
