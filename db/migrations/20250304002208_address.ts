import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('addresses', (table) => {
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

