import { body } from "express-validator";

export const movieCreateValidation = () => {
  return [
    body("title").isString().withMessage(`Title is missing`),
    body("rating")
      .isNumeric()
      .withMessage(`Rating is not a number`)
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error(`Rating must be between 0 and 10`);
        }
        return true;
      }),
    body("description").isString().withMessage(`Description is missing`),
    body("director").isString().withMessage(`Director is missing`),
    body("poster").isURL().withMessage(`Image must be an URL`),
  ];
};
