import { body } from "express-validator";
const validation = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("category is Required")
    .isLength({ min: 3 })
    .withMessage("category name can be either 3 charector "),
];

export { validation };
