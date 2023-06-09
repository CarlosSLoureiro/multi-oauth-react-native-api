import { StatusCodes } from 'http-status-codes';

const getAuthWith = (thirdParty: string): object => {
  const capitalizedThirdParty = thirdParty.charAt(0).toUpperCase() + thirdParty.slice(1);

  return {
    get: {
      summary: `${capitalizedThirdParty} authentication route.`,
      tags: [`Authentication`],
      parameters: [
        {
          name: `data`,
          in: `query`,
          description: `Encrypted data that brings client data to be used in callback route redirect`,
          required: false,
          schema: {
            type: `string`
          }
        }
      ],
      responses: {
        [StatusCodes.TEMPORARY_REDIRECT]: {
          description: `This route will redirect the user to ${thirdParty} authorization form to continue the authentication.`,
          headers: {
            Location: {
              description: `${capitalizedThirdParty} authentication route`
            }
          }
        }
      }
    }
  };
};

const getCallback = (thirdParty: string): object => {
  return {
    get: {
      summary: `Callback route from ${thirdParty} authentication.`,
      tags: [`Authentication`],
      responses: {
        [StatusCodes.TEMPORARY_REDIRECT]: {
          description: `The ${thirdParty} authorization form will bring the user data to this route after confirmation. This route will redirect the user to client with encrypted data query as user authentication data (same as auth route: user id, name, email, picture and authentication token)`,
          headers: {
            Location: {
              description: `https://web-version-app.carlosloureiro.xyz/?data=ENCRYPTED_DATA | exp://DEBUGGER_HOST/--/?data=ENCRYPTED_DATA`
            }
          }
        }
      }
    }
  };
};

export default {
  getAuthWith,
  getCallback
};
