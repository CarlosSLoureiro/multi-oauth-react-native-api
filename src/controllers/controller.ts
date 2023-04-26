import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";

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
    };
};