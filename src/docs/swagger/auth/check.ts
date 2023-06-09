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
              required: [`id`, `name`, `email`, `picture`],
              properties: {
                id: {
                  type: `number`,
                  description: `User id`,
                  example: `1`
                },
                name: {
                  type: `string`,
                  description: `User name`,
                  example: `Carlos Loureiro`
                },
                email: {
                  type: `string`,
                  description: `User email`,
                  example: `loureiro.s.carlos@gmail.com`
                },
                picture: {
                  type: `string`,
                  description: `User picture`,
                  example: `https://i.imgur.com/xCvzudW.png`
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
