import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `OAuth2 error route.`,
    tags: [`Authentication`],
    responses: {
      [StatusCodes.OK]: {
        description: `In case of some OAuth2 way throws error, it will route to this endpoint that will redirect the user to client with encrypted data query as error.`,
        headers: {
          Location: {
            description: `https://web-version-app.carlosloureiro.xyz/?data=ENCRYPTED_DATA | exp://DEBUGGER_HOST/--/?data=ENCRYPTED_DATA`
          }
        }
      }
    }
  }
};
