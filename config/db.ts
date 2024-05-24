import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("databaseUrl");

  try {
    await mongoose.connect(dbUri);
    Logger.info(`DB Connect`);
  } catch (error) {
    Logger.error(`Erro in DB Connection`);
    Logger.error(`Error: ${error}`);
    process.exit(1);
  }
}

export default connect;
