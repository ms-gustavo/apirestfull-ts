import i18n from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "pt-BR",
    preload: ["en", "pt-BR"],
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
      order: ["header", "querystring"],
      caches: false,
    },
  });

export default i18n;
export const handle = middleware.handle(i18n);
