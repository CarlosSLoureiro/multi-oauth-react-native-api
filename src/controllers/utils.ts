import getClientData from "@utils/client-data/get";
import encryptData from "@utils/data-manager/encrypt";

import { type Request, type Response } from 'express';

export default abstract class ControllersUtils {
  static wasRequestedFromMobile (request: Request): boolean {
    const userAgent = request.headers[`user-agent`];

    return ((/android/i.test(userAgent)) || (/iPad|iPhone|iPod/.test(userAgent)));
  }

  static redirectToDeepOrQueryLink (request: Request, response: Response, data: object): void {
    let url: string;

    const { CLIENT_DOMAIN } = process.env;

    const clientData = getClientData(request);

    if (ControllersUtils.wasRequestedFromMobile(request)) {
      if (clientData?.isDevelopment) {
        url = `exp://${clientData.debuggerHost}/--/`;
      } else {
        url = `myapptest://`;
      }
    } else {
      if (clientData?.isDevelopment) {
        url = request.headers.referer;
        if (url.endsWith(`/`)) {
          url = url.slice(0, -1);
        }
        url = `${url}${clientData.webScreenRoute}`;
      } else {
        url = `${CLIENT_DOMAIN}${clientData.webScreenRoute}`;
      }
    }

    url = `${url}?data=${encryptData(data)}`;

    response.redirect(url);
  }
}
