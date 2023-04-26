import { StatusCodes } from "http-status-codes";

export default abstract class Controller { 
    public static jsonResponse (data: any, status: number = StatusCodes.OK): Response {
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