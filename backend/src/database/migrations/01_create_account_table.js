exports.up = function (knex) {
  return knex.schema.createTable('account', (table) => {
    table.integer('id', 6).primary();
    table.integer('user').notNullable();
    table.decimal('value').notNullable();

    table.foreign('user').references('user.id_in_user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('account');
};