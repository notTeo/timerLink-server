import { body, validationResult } from "express-validator";
import { sendErrorResponse } from "../../utils/responses";
import { Request, Response, NextFunction } from "express";

export const createUserValidation = [
  body("name")
    .exists()
    .withMessage("You must provide a name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be between 4 and 20 characters")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Name must contain only letters and numbers"),

  body("password")
    .exists()
    .withMessage("You must provide a password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 8 })
    .withMessage("Password must be exactly 8 characters long")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Password must contain only letters and numbers"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      return sendErrorResponse(res, errorMessages);
    }
    next();
  },
];
