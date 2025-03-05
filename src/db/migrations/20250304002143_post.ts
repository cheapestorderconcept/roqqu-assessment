import { DbTableName } from "../../common/constants";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(DbTableName.POST);
    if (exists) return;
    await knex.schema.createTable(DbTableName.POST, (table) => {
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

