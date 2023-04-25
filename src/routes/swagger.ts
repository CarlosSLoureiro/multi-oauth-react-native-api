import Env from "../env";
import { Router } from "cloudworker-router";
import { MountSwaggerUI } from "../docs/swagger";
import { StatusCodes } from 'http-status-codes';

export default abstract class SwaggerRoutes {
    public static init (router: Router<Env>, swaggerPaths: Object): void {
        router.get('/swagger', async context => {
            const data = MountSwaggerUI(context.env, swaggerPaths);
            
            return new Response(
                data as BodyInit,
                {
                    headers: {
                        'Content-Type': 'text/html'
                    },
                    status: StatusCodes.OK
                }
            );
        });
    };
}