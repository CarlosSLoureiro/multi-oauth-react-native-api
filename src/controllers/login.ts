import Env from "../env";
import { Context } from "cloudworker-router";
import Controller from "./controller";
import LoginService from "../services/login";
import { injectable } from "inversify";
import container from "../container";

@injectable()

export default class LoginController extends Controller { 
    public async login(context: Context<Env>) {
        const loginService = container.get<LoginService>(LoginService);

        return super.jsonResponse(await loginService.doLogin());
    }
};