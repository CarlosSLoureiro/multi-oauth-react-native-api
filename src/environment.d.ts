declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAME: string;
      VERSION: string;
      SERVER_PROTOCOL: string;
      SERVER_HOST: string;
      SERVER_PORT: number;
    }
  }
}

export {};
