import CryptoJS from "crypto-js";
import { type Request, type Response } from 'express';
import ip from 'ip';

export default abstract class ControllersUtils {
  static wasRequestedFromMobile (request: Request): boolean {
    const userAgent = request.headers[`user-agent`];

    return ((/android/i.test(userAgent)) || (/iPad|iPhone|iPod/.test(userAgent)));
  }

  static redirectToDeepOrQueryLink (request: Request, response: Response, data: object): void {
    const jsonResponse = JSON.stringify(data);
    const encrypted = encodeURIComponent(CryptoJS.AES.encrypt(jsonResponse, `CARLOS LOUREIRO`).toString());
    let url: string;

    const { API_ENV, CLIENT_DOMAIN } = process.env;

    if (ControllersUtils.wasRequestedFromMobile(request)) {
      const expoPort = 19000;
      url = API_ENV === `development` ? `exp://${String(ip.address())}:${expoPort}/--/` : `myapptest://`;
    } else {
      url = API_ENV === `development` && request.headers.referer ? request.headers.referer : CLIENT_DOMAIN;
    }

    response.redirect(`${url}?data=${encrypted}`);
  }
}
