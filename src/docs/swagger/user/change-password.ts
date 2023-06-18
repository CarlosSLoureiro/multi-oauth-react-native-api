import { StatusCodes } from 'http-status-codes';

export default {
  patch: {
    summary: `Change user password.`,
    tags: [`User`],
    requestBody: {
      description: `The payload required to change the user password`,
      required: true,
      content: {
        'application/json': {
          schema: {
            required: [`newPassword`, `confirmPassword`],
            properties: {
              currentPassword: {
                type: `string`,
                description: `The current user password`,
                example: `JQI191UJLA`
              },
              newPassword: {
                type: `string`,
                description: `The new user password`,
                example: `QHasj901AJKj`
              },
              confirmPassword: {
                type: `string`,
                description: `The new user password confirmation`,
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
              required: [`token`],
              properties: {
                token: {
                  type: `string`,
                  description: `User JWT Token that must be update due the new password`,
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
