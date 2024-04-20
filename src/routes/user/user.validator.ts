import { body } from "express-validator";

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
];

export const updateUserValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be between 4 and 20 characters")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Name must contain only letters and numbers"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 8 })
    .withMessage("Password must be exactly 8 characters long")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Password must contain only letters and numbers"),
];
