import { OAuthProviders } from '@auth';

import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `OAuth route.`,
    tags: [`Authentication`],
    security: [],
    parameters: [
      {
        in: `path`,
        name: `provider`,
        description: `The OAuth provider name`,
        required: true,
        example: OAuthProviders.GOOGLE,
        schema: {
          type: `string`,
          enum: Object.values(OAuthProviders)
        }
      },
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
        description: `This route will redirect the user to OAuth authorization form provider to continue the authentication.`,
        headers: {
          Location: {
            description: `OAuth authentication route`
          }
        }
      }
    }
  }
};
