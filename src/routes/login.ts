import Env from "../env";
import container from "../container";
import { Router } from "cloudworker-router";
import swaggerData from '../docs/swagger/login';
import LoginController from "../controllers/login";

export default abstract class LoginsRoutes {
    public static init (router: Router<Env>, swaggerPaths: Object): void {
        const loginController = container.get<LoginController>(LoginController);

        swaggerPaths['/login'] = swaggerData;
        router.post('/login', loginController.login);
    };
};