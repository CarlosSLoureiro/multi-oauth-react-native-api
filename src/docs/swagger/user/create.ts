import { StatusCodes } from 'http-status-codes';

export default {
  post: {
    summary: `Create new user.`,
    tags: [`User`],
    requestBody: {
      description: `The payload required to create a new user`,
      required: true,
      content: {
        'application/json': {
          schema: {
            required: [`name`, `email`, `password`],
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
              required: [`id`, `name`, `user`, `email`, `token`],
              properties: {
                id: {
                  type: `number`,
                  description: `The user id`,
                  example: `1`
                },
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
