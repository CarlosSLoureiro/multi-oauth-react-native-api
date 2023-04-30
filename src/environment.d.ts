declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PROTOCOL: string;
      SERVER_HOST: string;
      SERVER_PORT: number;
    }
  }
}

export {};
