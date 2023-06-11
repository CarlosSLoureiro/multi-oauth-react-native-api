export default {
  schemas: {
    Error: {
      required: [`error`],
      properties: {
        error: {
          type: `string`,
          description: `Description of the error response`
        }
      }
    }
  },
  parameters: {},
  responses: {
    BadRequest: {
      description: `Error Response`,
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/Error`
          },
          example: {
            error: `Something went wrong`
          }
        }
      }
    }
  }
};
