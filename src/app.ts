import express from "express";
import config from "config";
import router from "./router";
import db from "../config/db";

const app = express();
const PORT = config.get<number>("port");

app.use(express.json());

app.use("/api/", router);

app.listen(PORT, async () => {
  await db();
  console.log(`Running on ${PORT}`);
});
