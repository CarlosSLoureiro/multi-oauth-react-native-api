import { StatusCodes } from 'http-status-codes';

export default {
  post: {
    summary: `Create new user.`,
    tags: [`User`],
    security: [],
    requestBody: {
      description: `The payload required to create a new user`,
      required: true,
      content: {
        'application/json': {
          schema: {
            required: [`name`, `email`, `password`, `confirmPassword`],
            properties: {
              name: {
                type: `string`,
                description: `The full user name`,
                example: `Carlos Loureiro`
              },
              email: {
                type: `string`,
                description: `The user email address`,
                example: `loureiro.s.carlos@gmail.com`
              },
              password: {
                type: `string`,
                description: `The user password`,
                example: `QHasj901AJKj`
              },
              confirmPassword: {
                type: `string`,
                description: `The user password confirmation`,
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
