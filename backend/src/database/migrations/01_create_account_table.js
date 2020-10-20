exports.up = function (knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.string('id')
      .primary();
    table.integer('user_id')
      .unsigned();
    table.decimal('value')
      .notNullable();

    table.foreign('user_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accounts');
};