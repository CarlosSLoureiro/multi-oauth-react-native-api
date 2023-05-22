import { type NextFunction, type Request, type Response } from "express";

export default function setClientData (request: Request, response: Response, next: NextFunction): void {
  if (request.query.data) {
    response.cookie(`data`, request.query.data);
  }
  next();
}
