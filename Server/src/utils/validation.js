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
    .withMessage("Password is Required")
    .isLength({ max: 32, min: 3 })
    .withMessage("Password can be either 3 charector or 32"),
  /*
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .withMessage(
      "Password should be contained at least one upper case letter and one lower case letter one number and one special character"
    ), */
];

export { validation };
