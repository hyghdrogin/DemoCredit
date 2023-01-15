import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("debits", (table) => {
    table.increments("id").primary();
    table.integer("receiver").unsigned().notNullable();
    table.foreign("receiver").references("id").inTable("users");
    table.integer("sender").unsigned().notNullable();
    table.foreign("sender").references("id").inTable("users");
    table.integer("amount").defaultTo(0);
    table.enu("type", ["withdrawal", "transfer"]);
    table.enu("status", ["pending", "successful", "declined", "failed", "cancelled", "conflict"]).defaultTo("pending");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("debits");
}
