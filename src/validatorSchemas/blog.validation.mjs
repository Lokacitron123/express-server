export const createBlogValidationSchema = {
  title: {
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: "Title must be between 2 and 100 characters long",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
  },
  content: {
    notEmpty: {
      errorMessage: "Content cannot be empty",
    },
    isString: {
      errorMessage: "Content must be a string",
    },
  },
};

export const editBlogContentValidationSchema = {
  title: {
    optional: { options: { nullable: true } },
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: "Title must be between 2 and 100 characters long",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
  },
  content: {
    optional: { options: { nullable: true } },
    notEmpty: {
      errorMessage: "Content cannot be empty",
    },
    isString: {
      errorMessage: "Content must be a string",
    },
  },
};

export const editBlogValidationSchema = {
  tags: {
    optional: { options: { nullable: true } },
    isArray: {
      errorMessage: "Tags must be an array of tag objects",
    },
  },
  status: {
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "Status must be a string",
    },
    isIn: {
      options: [["draft", "published"]],
      errorMessage: "Status must be either 'draft' or 'published'",
    },
  },
};
