import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `OAuth authentication route.`,
    tags: [`Authentication`],
    security: [],
    parameters: [
      {
        in: `path`,
        name: `thirdParty`,
        description: `The third party oauth name`,
        required: true,
        example: `google`,
        schema: {
          type: `string`,
          enum: [`google`, `facenook`, `twitter`]
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
        description: `This route will redirect the user to OAuth authorization form from third party to continue the authentication.`,
        headers: {
          Location: {
            description: `OAuth authentication route`
          }
        }
      }
    }
  }
};
