import Env from "../env";
import { Context } from "cloudworker-router";
import Controller from "./controller";
import LoginService from "../services/login";

export default class LoginController extends Controller { 
    public static async login(context: Context<Env>) {
        const service = new LoginService();

        return Controller.jsonResponse(await service.doLogin());
    }
};