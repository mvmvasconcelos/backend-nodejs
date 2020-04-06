exports.up = function(knex) {
    return knex.schema.createTable('pessoas', function (table){
        table.increments();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.dateTime('data_nascimento').notNullable();

        //Chave estrangeira
        table.string('user_id').notNullable();        
        table.foreign('user_id').references('id').inTable('usuarios');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pessoas');
};
