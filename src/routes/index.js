/**
 * @fileoverview Módulo de configuración de rutas principales para la aplicación Express.
 * @description Este módulo configura las rutas principales para los distintos recursos de la API.
 */

const express = require('express');
const router = express.Router();

const sensorRoute = require('./sensor.route');

/**
 * @namespace routesIndex
 * @description Un arreglo de objetos que define las rutas y sus correspondientes controladores.
 */
const routesIndex = [
    {
        path: '/sensor',
        route: sensorRoute
    }
]

/**
 * Configura las rutas de la aplicación Express.
 * @function
 * @name router.use
 * @memberof express.Router
 * @param {string} path - La ruta base para las rutas y controladores definidos en 'routesIndex'.
 * @param {object} route - El controlador de ruta correspondiente para la ruta especificada.
 */
routesIndex.forEach((route) => {
    router.use(route.path, route.route)
})

/**
 * Exporta el enrutador configurado para su uso en la aplicación Express.
 * @module router
 */
module.exports = router;
