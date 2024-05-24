import express from "express";
import config from "config";

const app = express();

app.use(express.json());

const PORT = config.get<number>("port");
app.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`);
});
