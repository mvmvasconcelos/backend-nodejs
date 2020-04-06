const express = require('express');

const UsuariosController = require('./controllers/UsuariosController');
const PessoasController = require('./controllers/PessoasController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.criar);

// É possível criar rotas iguais porém com métodos diferentes
routes.get('/usuarios', UsuariosController.index);
routes.post('/usuarios', UsuariosController.criar);

routes.get('/pessoas', PessoasController.index);
routes.post('/pessoas', PessoasController.criar);
//ID será passado pela url
routes.delete('/pessoas/:id', PessoasController.deletar);

module.exports = routes;