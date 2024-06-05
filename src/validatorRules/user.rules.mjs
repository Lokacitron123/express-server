import { body, query } from "express-validator";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 5, max: 32 })
    .withMessage("Username must at least be between 5 and 32 characters long")
    .isString()
    .withMessage("Username must be a string"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isLength({ min: 5, max: 32 })
    .withMessage("Lastname must at least be between 5 and 32 characters long")
    .isString()
    .withMessage("Lastname must be a string"),
];

export const filteredUserValidation = [
  query("filter")
    .optional()
    .isString()
    .withMessage("Filter query must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage("Query length must be between 3 and 10 characters"),
  query("value")
    .optional()
    .isString()
    .withMessage("Value query must be a string")
    .isLength({ min: 1 })
    .withMessage("Value query must be at least 1 character long"),
];
