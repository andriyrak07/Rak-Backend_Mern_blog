import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array().map((err) => {
      return err.msg;
    });
    return res.status(400).json(err.toString());
  }
  next();
};
