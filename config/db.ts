import mongoose from "mongoose";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("databaseUrl");

  try {
    await mongoose.connect(dbUri);
    console.log(`DB Connect`);
  } catch (error) {
    console.log(`Erro in DB Connection`);
    console.log(`Error: ${error}`);
  }
}

export default connect;
