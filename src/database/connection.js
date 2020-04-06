const knex = require('knex');
const configuration = require('../../knexfile');

//Seleciona a configuração de desenvolvimento do arquivo
const connection = knex(configuration.development);

module.exports = connection;