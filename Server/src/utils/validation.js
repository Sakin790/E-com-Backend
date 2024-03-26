import { body } from "express-validator";
const validation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ max: 32, min: 3 })
    .withMessage("Name can be either 3 charector or 32"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
  .trim()
  .notEmpty()
  .withMessage("Password is Required"),
];

export { validation };
