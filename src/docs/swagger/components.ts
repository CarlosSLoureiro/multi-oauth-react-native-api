export default {
  schemas: {
    Error: {
      message: ``,
      required: [`message`],
      properties: {
        message: {
          type: `string`,
          description: `Description of the error response`
        }
      }
    }
  },
  parameters: {},
  responses: {
    BadRequest: {
      description: `Invalid request`,
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/Error`
          },
          example: {
            message: `User not found`
          }
        }
      }
    }
  }
};
