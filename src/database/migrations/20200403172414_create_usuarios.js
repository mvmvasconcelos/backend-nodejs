exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function (table){
        table.increments();
        table.string('nome').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
