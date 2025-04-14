// Mapper for environment variables
export const environment = process.env.NODE_ENV || "dev";
import dotenv from "dotenv";
dotenv.config();

const db:any = {};
console.log("Env", environment)

if (environment.trim() == 'uat') {
  console.log("UAT")
  db["minPoolSize"] = process.env.DB_MIN_POOL_SIZE_UAT;
  db["maxPoolSize"] = process.env.DB_MAX_POOL_SIZE_UAT;
  db["dbURI"] = `mongodb+srv://${process.env.DB_USERNAME_UAT
    }:${process.env.DB_PASSWORD_UAT}${process.env.DB_HOST_UAT}/${process.env.DB_NAME_UAT}`;
} else {
  db["minPoolSize"] = process.env.DB_MIN_POOL_SIZE_DEV||2;
  db["maxPoolSize"] = process.env.DB_MAX_POOL_SIZE_DEV||10;
  db["dbURI"] = `mongodb://${process.env.DB_HOST_DEV}:${process.env.DB_PORT}/${process.env.DB_NAME_DEV}`;
}

export default db;

