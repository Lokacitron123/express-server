export const createCommentValidationSchema = {
  content: {
    notEmpty: {
      errorMessage: "Content cannot be empty",
    },
    isLength: {
      options: { min: 1, max: 500 },
      errorMessage: "Content must be between 1 and 500 characters long",
    },
    isString: {
      errorMessage: "Content must be a string",
    },
  },
};
