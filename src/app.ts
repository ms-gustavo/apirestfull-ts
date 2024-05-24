import express from "express";
import config from "config";
import router from "./router";

const app = express();

app.use(express.json());

app.use("/api/", router);

const PORT = config.get<number>("port");
app.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`);
});
