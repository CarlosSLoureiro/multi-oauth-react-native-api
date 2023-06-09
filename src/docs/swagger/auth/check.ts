import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `Check authentication token.`,
    tags: [`Authentication`],
    responses: {
      [StatusCodes.OK]: {
        description: `Success`,
        content: {
          'application/json': {
            schema: {
              required: [`token`],
              properties: {
                token: {
                  type: `string`,
                  description: `User JWT Token that must be used`,
                  example: `eyJ0eXAiOiJKV1QiLCJ...`
                }
              }
            }
          }
        }
      },
      [StatusCodes.UNAUTHORIZED]: {
        description: `Unauthorized`,
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/Error`
            },
            example: {
              error: `Expired auth token`
            }
          }
        }
      }
    }
  }
};
