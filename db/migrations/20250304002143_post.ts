import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('title');
        table.string('body');
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('users.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('posts');
}

