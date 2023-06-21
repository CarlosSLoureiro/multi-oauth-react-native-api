import { StatusCodes } from 'http-status-codes';

export default {
  get: {
    summary: `List users activities per page.`,
    tags: [`Activity`],
    parameters: [
      {
        name: `page`,
        description: `The page number of list`,
        example: 0,
        required: false,
        type: `number`,
        in: `path`
      }
    ],
    responses: {
      [StatusCodes.OK]: {
        description: `Success`,
        content: {
          'application/json': {
            schema: {
              type: `array`,
              items: {
                type: `object`,
                required: [`id`, `user`, `message`, `date`],
                properties: {
                  id: {
                    type: `number`,
                    description: `Activity id`,
                    example: 2
                  },
                  user: {
                    type: `object`,
                    properties: {
                      name: {
                        type: `string`,
                        description: `User name`,
                        example: `Carlos Loureiro`
                      },
                      picture: {
                        type: `string`,
                        description: `User picture URL`,
                        example: `https://lh3.googleusercontent.com/a/AAcHTtcHcuERO_MND_7vQgxEw6Ed00I62hm7zZ-79fxpFg=s96-c`
                      }
                    }
                  },
                  message: {
                    type: `string`,
                    description: `Activity message`,
                    example: `Has logged in using his Google account`
                  },
                  date: {
                    type: `string`,
                    description: `Activity date`,
                    example: `2023-06-21T05:13:23.000Z`
                  }
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
