import { StatusCodes } from 'http-status-codes';

export default {
  post: {
    summary: `Do login.`,
    tags: [`Login`],
    parameters: [
      {
        in: `body`,
        name: `body`,
        description: `Pet object that needs to be added to the store`,
        required: false,
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
    ],
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
      [StatusCodes.BAD_REQUEST]: {
        $ref: `#/components/responses/BadRequest`
      }
    }
  }
};
