import { Payload } from '../src/auth';

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;

      JWT_SECRET: string;
    }
  }

  namespace Express {
    interface Request {
      id: string;
    }
    // tslint:disable-next-line: no-empty-interface
    interface User extends Payload {}
  }
}
