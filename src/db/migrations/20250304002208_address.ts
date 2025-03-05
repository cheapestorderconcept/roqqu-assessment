import type { Knex } from "knex";
import { DbTableName } from "../../common/constants";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(DbTableName.ADDRESS);
    if (exists) return;
    await knex.schema.createTable(DbTableName.ADDRESS, (table) => {
        table.increments('id').primary();
        table.string('street');
        table.string('city');
        table.string('state');
        table.string('zip');
        table.integer('userId').unsigned().notNullable().unique();
        table.foreign('userId').references('users.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('addresses');
}

