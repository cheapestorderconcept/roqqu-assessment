import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable('users');
    if (exists) return;
   await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.timestamps(true, true);
    }
    )
}


export async function down(knex: Knex): Promise<void> {
}

