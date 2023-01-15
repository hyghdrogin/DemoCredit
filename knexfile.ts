// Update with your config settings.
import config from "./src/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const db = {

  development: {
    client: "mysql",
    connection: config.SQL_URL
  },

  production: {
    client: "mysql",
    connection: {
      database: config.DATABASE_NAME,
      user: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      host: config.DATABASE_HOST,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "dc_migrations"
    }
  }
};

export default db;
