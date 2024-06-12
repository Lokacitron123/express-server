import { body, query } from "express-validator";

// This is how we can do validation if chained instead of passing a validation schema to checkSchema function
export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 2, max: 18 })
    .withMessage("Username must at least be between 5 and 32 characters long")
    .isString()
    .withMessage("Username must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isLength({ min: 2, max: 18 })
    .withMessage("Lastname must at least be between 5 and 32 characters long")
    .isString()
    .withMessage("Lastname must be a string"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 2, max: 18 })
    .withMessage("Password must at least be between 5 and 32 characters long")
    .isString()
    .withMessage("Password must be a string"),
];

export const filteredUserValidation = [
  query("filter")
    .optional()
    .isString()
    .withMessage("Filter query must be a string")
    .isLength({ min: 1, max: 18 })
    .withMessage("Query length must be between 3 and 10 characters"),
  query("value")
    .optional()
    .isString()
    .withMessage("Value query must be a string")
    .isLength({ min: 1 })
    .withMessage("Value query must be at least 1 character long"),
];

export const authUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 2, max: 18 })
    .isString()
    .withMessage("Username must be a valid string"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 2, max: 18 })
    .isString(),
];
