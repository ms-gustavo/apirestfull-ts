import express from "express";
import config from "config";
import router from "./router";
import db from "../config/db";
import Logger from "../config/logger";

const app = express();
const PORT = config.get<number>("port");

app.use(express.json());

app.use("/api/", router);

app.listen(PORT, async () => {
  await db();
  Logger.info(`Running on ${PORT}`);
});
