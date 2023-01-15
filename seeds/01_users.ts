/* eslint-disable import/prefer-default-export */
import { Knex } from "knex";
import bcrypt from "bcrypt";
import config from "../src/config";

const seedPassword = config.SEED_PASSWORD as string;
const hash = bcrypt.hashSync(seedPassword, 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "1", email: "admin@democredit.com", username: "admin", password: hash, balance: 15000
    },
    {
      id: "2", email: "hyghdro@democredit.com", username: "hyghdro", password: hash, balance: 1000
    },
    {
      id: "3", email: "emma@democredit.com", username: "emma", password: hash, balance: 5000
    },
  ]);
}
