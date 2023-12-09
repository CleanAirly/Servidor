/**
 * @fileoverview Archivo principal de la aplicación Express.
 * @description Este archivo configura y ejecuta un servidor Express para una API.
 */

const express = require('express');
const app = express();

const routes = require('./routes');
const bodyParser = require('body-parser');

var cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

/**
 * @namespace routes
 * @description Rutas de la API.
 */
app.use('/api', routes)

const port = process.env.PORT || 3001;
const host = '192.168.136.129';

/**
 * Inicia el servidor Express.
 * @function
 * @name listen
 * @memberof express.Application
 * @param {number} port - El puerto en el que escuchará el servidor.
 * @param {string} host - La dirección IP o el host en el que se ejecutará el servidor.
 * @param {function} callback - Una función que se ejecutará cuando el servidor esté listo.
 */
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});

module.exports = app;