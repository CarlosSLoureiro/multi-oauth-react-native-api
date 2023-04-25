import Env from "../env";
import { Router } from "cloudworker-router";
import { StatusCodes } from 'http-status-codes';
import swaggerData from '../docs/swagger/login';

export default abstract class LoginsRoutes {    
    public static init (router: Router<Env>, swaggerPaths: Object): void {
        swaggerPaths['/login'] = swaggerData;
        router.post('/login', async context => {
            const data = {
                token: 'output example'
            };

            return new Response(
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    status: StatusCodes.OK
                }
            );
        });
    };
};