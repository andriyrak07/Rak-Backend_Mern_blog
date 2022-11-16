import { body } from "express-validator";

export const loginValidator = [
  body("email", "Incorrect format of email").isEmail(),
  body("password", "Min length of password 5 characters").isLength({ min: 5 }),
];

export const registerValidator = [
  body("email", "Incorrect format of email").isEmail(),
  body("password", "Min length of password 5 characters").isLength({ min: 5 }),
  body("fullName", "Enter a name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar link").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter the name of post").isLength({ min: 3 }).isString(),
  body("text", "Enter the text of post").isLength({ min: 10 }).isString(),  
  body("tags", "Don't correct format of tags").optional().isString(),
  body("imageUrl", "Don't correct the link of image").optional().isString(),
];

export const commentCreateValidation = [
  body("text", "Enter the text of comment").isString(),  
];
