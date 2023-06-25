import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `OAuth error route.`,
    tags: [`Authentication`],
    security: [],
    responses: {
      [StatusCodes.TEMPORARY_REDIRECT]: {
        description: `In case of some OAuth way throws error, it will route to this route that will redirect the user to client with encrypted data query as error.`,
        headers: {
          Location: {
            description: `https://web-version-app.carlosloureiro.xyz/?data=ENCRYPTED_DATA | exp://DEBUGGER_HOST/--/?data=ENCRYPTED_DATA`
          }
        }
      }
    }
  }
};
