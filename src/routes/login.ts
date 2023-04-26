import Env from "../env";
import { Router } from "cloudworker-router";
import swaggerData from '../docs/swagger/login';
import LoginController from "../controllers/login";

export default abstract class LoginsRoutes {
    public static init (router: Router<Env>, swaggerPaths: Object): void {
        swaggerPaths['/login'] = swaggerData;
        router.post('/login', LoginController.login);
    };
};