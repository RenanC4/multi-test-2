
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const createError = require('http-errors');

const swaggerDocument = require('../docs/v1/materialsScheme.json');
const config = require('../config/general');

const Material = require('./controllers/materialController');


const materialController = new Material(
    createError,
);

// eslint-disable-next-line new-cap
const routes = express.Router();
routes.use('/docs', swaggerUi.serve);
routes.get('/docs', swaggerUi.setup(swaggerDocument));


routes.get('/material/:shortname',
    materialController
        .getMaterialByShortname
        .bind(materialController));


routes.get('/health', function(req, res, next) {
  return res.status(200).json({status: 'UP'});
});

routes.get('/live', function(req, res, next) {
  return res.status(200).send({message: 'connected'});
});

routes.use(function(err, req, res, next) {
  res.status(err.status || 500).send({message: err.message});
});


module.exports = routes;
