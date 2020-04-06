const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        /** A página padrão será a 1 */
        const { pagina = 1 } = request.query

        const [conta] = await connection('pessoas').count();
        console.log(conta);
        const pessoas = await connection('pessoas')
            .join('usuarios', 'usuarios.id', '=', 'pessoas.user_id')
            // Limite de 5 resultados por busca
            .limit(5)
            /** Deve pular de 5 em 5 porém deve inciar no 0
             * por isso não dá simplesmente pra multiplicar a página por 5
             * então na página 1 ele subtrai 1 que dá 0, começando do zero
             * na página 2, ele subtrai 1 que dá 1, começando do 5
             */
            .offset((pagina - 1) * 5)
            .select('pessoas.*', 'usuarios.nome as user_nome');

        /** Manda para o header o total sendo que a convenção de nome
         *  para esta variável é X-Total-Count. count(*) é a propriedade
         *  de conta que tem a quantidade de registros
         */
        response.header('X-Total-Count', conta['count(*)']);
        return response.json(pessoas);
    },

    async criar(request, response) {
        const { nome, email, telefone, data_nascimento } = request.body;

        /** O usuário será pego de acordo com a autenticação da aplicação,
         * isto será passado por meio do header do usuário logado
         */
        const user_id = request.headers.authorization;

        /** Como a inserção será de um único registro, o resultado será
         * um array com uma única posição. Para pegar o id poderia usar
         * const result = await connection... 
         * e depois
         * const id = result[0]
         * para pegar a primeira chave do array, mas é possível usar a 
         * desestruturação para fazer isso de modo mais simples
         */
        const [id] = await connection('pessoas').insert({
            nome,
            email,
            telefone,
            data_nascimento,
            user_id,
        });

        return response.json({ id });
    }, 
    async deletar(request, response) {
        //Recebe o id como parâmetro da requisição
        const { id } = request.params;
        
        // Pega o id do usuário logado através do header
        const user_id = request.headers.authorization;

        // SELECT user_id FROM pessoas WHERE id = id LIMIT 1
        const pessoa = await connection('pessoas')
            .where('id', id)
            .select('user_id')
            .first();

        /** Se o usuário que está tentando excluir a pessoa
         * não é o mesmo que a criou, altera o status do HTTP
         * para 401, que é não autorizado. 
         * geralmente quando ocorre sucesso o status é 200
        */
        if( pessoa.user_id !== user_id){
            return response.status(401).json({error: 'Operação não permitida.'});
        }
        /** DELETE FROM pessoas WHERE id = id */
        await connection('pessoas').where('id', id).delete();

        // Retorna 204, que é uma resposta sem conteúdo mas com sucesso.
        return response.status(204).send();        
    }
}