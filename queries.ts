import knex from "knex";
import db from "./knexfile";

const database = knex(db.development);

export default database;
