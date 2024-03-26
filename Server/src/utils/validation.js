import { body } from "express-validator";
const validation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ max: 32, min: 3 })
    .withMessage("Name can be either 3 charector or 32"),
];

export { validation };
