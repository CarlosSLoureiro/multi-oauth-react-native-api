// import {createUser, loginUser} from '../controllers/UserController';

import { Router } from "cloudworker-router";
import LoginsRoutes from "./login";
import SwaggerRoutes from "./swagger";
import Env from "../env";

export abstract class Routes {
    public static init(router: Router<Env>) {
        const swaggerPaths = {};

        LoginsRoutes.init(router, swaggerPaths);
        SwaggerRoutes.init(router, swaggerPaths);
    }
}