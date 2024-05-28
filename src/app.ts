import express from "express";
import config from "config";
import router from "./router";
import db from "../config/db";
import Logger from "../config/logger";
import morganMiddleware from "./middlewares/morganMiddleware";
import { handle as i18nHandle } from "../config/i18n";

const app = express();
const PORT = config.get<number>("port");

app.use(express.json());
app.use(i18nHandle);
app.use(morganMiddleware);
app.use("/api/", router);

app.listen(PORT, async () => {
  await db();
  Logger.info(`Running on ${PORT}`);
});
