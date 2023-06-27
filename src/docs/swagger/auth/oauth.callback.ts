import { StatusCodes } from "http-status-codes";

export default {
  get: {
    summary: `Callback route from OAuth authentication.`,
    tags: [`Authentication`],
    security: [],
    parameters: [
      {
        in: `path`,
        name: `provider`,
        description: `The OAuth provider name`,
        required: true,
        example: `google`,
        schema: {
          type: `string`,
          enum: [`google`, `facenook`, `twitter`]
        }
      }
    ],
    responses: {
      [StatusCodes.TEMPORARY_REDIRECT]: {
        description: `The OAuth provider authorization form will bring the user data to this route after confirmation. This route will redirect the user to client with encrypted data query as user authentication data (same as auth route: user id, name, email, picture and authentication token)`,
        headers: {
          Location: {
            description: `https://web-version-app.carlosloureiro.xyz/?data=ENCRYPTED_DATA | exp://DEBUGGER_HOST/--/?data=ENCRYPTED_DATA`
          }
        }
      }
    }
  }
};
