import decryptData from "@utils/data-manager/decrypt";

import { type ClientData } from "./types";

import { type Request } from "express";

export default function getClientData (request: Request): ClientData {
  return decryptData(request.cookies.data) as ClientData;
}
