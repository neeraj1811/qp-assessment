// Mapper for environment variables
export const environment = process.env.NODE_ENV || "dev";
import dotenv from "dotenv";
dotenv.config();

const db:any = {};
console.log("Env", environment)

if (environment == 'dev') {
  db["minPoolSize"] = process.env.DB_MIN_POOL_SIZE_DEV;
  db["maxPoolSize"] = process.env.DB_MAX_POOL_SIZE_DEV;
  db["dbURI"] = `mongodb+srv://${process.env.DB_USERNAME_DEV
    }:${process.env.DB_PASSWORD_DEV}${process.env.DB_HOST_DEV}/${process.env.DB_NAME_DEV}`;
} else {
  db["minPoolSize"] = process.env.DB_MIN_POOL_SIZE_UAT||2;
  db["maxPoolSize"] = process.env.DB_MAX_POOL_SIZE_UAT||10;
  db["dbURI"] = `mongodb://${process.env.DB_HOST_UAT}:${process.env.DB_PORT_UAT}/${process.env.DB_NAME_UAT}`;
}

export default db;

