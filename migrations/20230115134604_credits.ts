import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("credits", (table) => {
    table.increments("id").primary();
    table.integer("owner").unsigned().notNullable();
    table.foreign("owner").references("id").inTable("users");
    table.integer("sender").unsigned().notNullable();
    table.foreign("sender").references("id").inTable("users");
    table.integer("amount").defaultTo(0);
    table.string("reference").notNullable().defaultTo("empty");
    table.enu("type", ["cardPayment", "transfer"]);
    table.enu("status", ["pending", "success", "declined", "failed", "cancelled", "conflict"]).defaultTo("pending");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("credits");
}
