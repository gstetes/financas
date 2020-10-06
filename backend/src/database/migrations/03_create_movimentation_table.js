exports.up = function (knex) {
  return knex.schema.createTable('movimentation', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.integer('account').notNullable();
    table.date('last_movimentation').notNullable();

    table.foreing('acconut').references('account.id_in_account');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movimentation');
};