import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";
import { response } from "../utils/response";

export class NotFoundPathException {
  constructor() {
    NotFoundPathException.handleNotFoundPath = NotFoundPathException.handleNotFoundPath.bind(this);
  }

  static handleNotFoundPath(req: Request, res: Response, next: NextFunction) {
    return response(res, `Path: ${req.method} ${req.url} not found.`, StatusCode.NOT_FOUND, NotFoundPathException.name);
  }
}