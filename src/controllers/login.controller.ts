import Env from "../env";
import { Context } from "cloudworker-router";
import Controller from "./controller";

export default class LoginController extends Controller { 
    public static async login(context: Context<Env>) {
        const data = {
            token: 'output example'
        };

        return Controller.jsonResponse(data);
    }
};