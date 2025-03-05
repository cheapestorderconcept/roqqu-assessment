import type { Knex } from "knex";
import { DbTableName } from "../../common/constants";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(DbTableName.USER);
    if (exists) return;
   await knex.schema.createTable(DbTableName.USER, (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.timestamps(true, true);
    }
    )
}


export async function down(knex: Knex): Promise<void> {
}

