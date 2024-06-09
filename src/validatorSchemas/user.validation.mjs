import { body, query } from "express-validator";

export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 2,
        max: 18,
      },
      errorMessage:
        "Username must at least be between 5 and 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "sername must be a string",
    },
  },
  email: {
    isLength: {
      options: {
        min: 2,
        max: 18,
      },
      errorMessage: "Email must at least be between 5 and 32 characters long",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 2,
        max: 18,
      },
      errorMessage:
        "Password must at least be between 5 and 32 characters long",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};

export const filteredUserValidationSchema = {
  filter: {
    optional: true,
    isString: {
      errorMessage: "Filter query must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 18,
      },
      errorMessage: "Query length must be between 1 and 18 characters",
    },
  },
  value: {
    optional: true,
    isString: {
      errorMessage: "Value query must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 18,
      },
      errorMessage: "Value length must be between 1 and 18 characters",
    },
  },
};

export const authUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 2,
        max: 18,
      },
      errorMessage:
        "Username must at least be between 5 and 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "sername must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 2,
        max: 18,
      },
      errorMessage:
        "Password must at least be between 5 and 32 characters long",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};
