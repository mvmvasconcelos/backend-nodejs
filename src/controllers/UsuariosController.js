const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        /** Salva na variável usuarios o resultado da query    
         * basicamente um SELECT * FROM usuarios */
        const usuarios = await connection('usuarios').select('*');
    
        return response.json(usuarios);
    },

    async criar (request, response) {
        /** As variáveis são as colunas do banco, pegas separadamente
         * para que não haja risco de inserção indesejada */    
        const { nome, senha } = request.body;
    
        // Passa o banco para fazer a conexão e o método
        await connection('usuarios').insert({
            nome,
            senha
        });
        /** Como a inserção pode demorar para ser resolvida, são
         * utilizados. É possível definr a função como assíncrona
         * utilizando o ASYNC e o AWAIT, desta forma o Node só 
         * retornará a resposta após AGUARDAR a finalização do 
         * código. */
    
        return response.json();
    }
}