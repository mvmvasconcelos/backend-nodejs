const connection = require('../database/connection');

module.exports = {
    async criar(request, response){
        const { id, senha } =  request.body;

        const usuario = await connection('usuarios')
            .where({
                'id': id,
                'senha': senha
            })
            .select('nome')
            .first();

        //Se não houver resultado, retorna status 400, bad request
        if (!usuario) {
            return response.status(400).json({error: 'Senha ou usuário incorretos'});
        }

        return response.json(usuario);
    }
}