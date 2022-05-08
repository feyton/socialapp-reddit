import { body, validationResult } from "express-validator";

export const PostValidation = () => [
  body("title", "This is required").notEmpty(),
  body("message", "message is required").notEmpty(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.param] = err.msg;
  });
  return res.status(400).json(extractedErrors);
};
