declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAME: string;
      SERVER_PROTOCOL: string;
      SERVER_HOST: string;
      SERVER_PORT: number;
    }
  }
}

export {};
