exports.up = function (knex) {
  return knex.schema.createTable('movimentations', (table) => {
    table.increments('id')
      .primary();
    table.string('type')
      .notNullable();
    table.string('description')
      .notNullable();
    table.decimal('value')
      .notNullable();
    table.integer('account_id');
    table.date('date');

    table.foreign('account_id')
      .references('id')
      .inTable('accounts');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movimentations');
};