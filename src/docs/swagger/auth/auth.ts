import { StatusCodes } from 'http-status-codes';

export default {
  post: {
    summary: `Do authentication with user password.`,
    tags: [`Authentication`],
    requestBody: {
      description: `The payload required to make the authentication`,
      required: true,
      content: {
        'application/json': {
          schema: {
            required: [`email`, `password`],
            properties: {
              email: {
                type: `string`,
                description: `The user email address`,
                example: `loureiro.s.carlos@gmail.com`
              },
              password: {
                type: `string`,
                description: `The user password`,
                example: `QHasj901AJKj`
              }
            }
          }
        }
      }
    },
    responses: {
      [StatusCodes.OK]: {
        description: `Success`,
        content: {
          'application/json': {
            schema: {
              required: [`id`, `name`, `email`, `picture`, `token`],
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
                },
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
      [StatusCodes.BAD_REQUEST]: {
        $ref: `#/components/responses/BadRequest`
      }
    }
  }
};
