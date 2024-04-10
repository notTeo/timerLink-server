import type { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/responses";

export function notFoundHandler(req: Request, res: Response): void {
  sendErrorResponse(res, "Not Found", 404);
}

export function genericErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`[ERROR]: ${error.message}`);
  sendErrorResponse(res, error.message, error.status ?? 500);
  next();
}

