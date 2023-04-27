import { injectable } from 'inversify';

import { StatusCodes } from 'http-status-codes';

@injectable()

export default class Controller {
  public jsonResponse (data: any, status: number = StatusCodes.OK): Response {
    return new Response(
      JSON.stringify(data) as BodyInit,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        status
      }
    );
  }
}
