const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();


// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: req.query  (Filtros, Ordenação, Paginação);
// Route Params: req.params (Identificar um recurso na alteração ou remoção);
// Body:         req.body   (Dados para criação ou alteração de registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);

module.exports = routes;