import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  header,
  ValidationChain,
  validationResult,
  FieldValidationError,
} from "express-validator";

export const token: ValidationChain[] = [
  header("authorization")
    .exists()
    .withMessage("Please provide a token")
    .custom((header) => {
      const authHeader = header.authorization;
      const token = authHeader?.split("Bearer ")[1];
      return !!token;
    })
    .withMessage("Invalid token"),
];

export function validate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0]?.msg;
      const validation = errors
        .array()
        .reduce(
          (a, c: FieldValidationError) => ({ ...a, [c.path]: c.msg }),
          {}
        );
      const error: any = new Error(firstError);
      error.validation = validation;
      error.status = 400;
      throw error;
    }
    next();
  } catch (e) {
    next(e);
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {

  } catch (e) {
    
  }
}