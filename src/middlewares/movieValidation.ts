import { body } from "express-validator";
import i18n from "i18next";

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage((value, { req }) => {
        return i18n.t("validations.title_missing");
      }),
    body("rating")
      .isNumeric()
      .withMessage((value, { req }) => {
        return i18n.t("validations.rating_not_numeric");
      })
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          return i18n.t("validations.rating_between");
        }
        return true;
      }),
    body("description")
      .isString()
      .withMessage((value, { req }) => {
        return i18n.t("validations.description_missing");
      }),
    body("director")
      .isString()
      .withMessage((value, { req }) => {
        return i18n.t("validations.director_missing");
      }),
    body("poster")
      .isURL()
      .withMessage((value, { req }) => {
        return i18n.t("validations.poster_invalid_url");
      }),
  ];
};
