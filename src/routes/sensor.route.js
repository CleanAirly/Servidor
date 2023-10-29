/**
 * @fileoverview Módulo de configuración de rutas para el recurso 'sensor'.
 * @description Este módulo define las rutas y sus correspondientes controladores para el recurso 'sensor'.
 */

const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

/**
 * @namespace /sensor
 * @description Configuración de rutas para el recurso 'sensor'.
 */

/**
 * Ruta para subir un nuevo valor de sensor.
 *
 * @name POST /sensor/value
 * @function
 * @memberof /sensor
 * @param {function} sensorController.uploadValue - Controlador para la solicitud POST.
 */
router.post('/value', sensorController.uploadValue)

/**
 * Ruta para obtener todos los valores de sensores.
 *
 * @name GET /sensor/
 * @function
 * @memberof /sensor
 * @param {function} sensorController.getValues - Controlador para la solicitud GET.
 */
router.route('/').get(sensorController.getValues)

/**
 * Ruta para eliminar un valor de sensor.
 *
 * @name DELETE /sensor/delete
 * @function
 * @memberof /sensor
 * @param {function} sensorController.deleteValue - Controlador para la solicitud DELETE.
 */
router.route('/delete').delete(sensorController.deleteValue)

/**
 * Ruta para realizar la autenticación de un usuario.
 *
 * @name GET /sensor/login
 * @function
 * @memberof /sensor
 * @param {function} sensorController.loginGet - Controlador para la solicitud GET.
 */
router.route('/login').post(sensorController.loginGet)

/**
 * Ruta para registrar un nuevo usuario.
 *
 * @name POST /sensor/registrate
 * @function
 * @memberof /sensor
 * @param {function} sensorController.registratePost - Controlador para la solicitud POST.
 */
router.route('/registrate').post(sensorController.registratePost)

/**
 * Ruta para obtener el nombre y apellidos de un usuario.
 *
 * @name GET /sensor/usuario
 * @function
 * @memberof /sensor
 * @param {function} sensorController.nombreUsuarioGet - Controlador para la solicitud GET.
 */
router.route('/usuario').post(sensorController.nombreUsuarioGet)

/**
 * Ruta para obtener la última medida de la sonda asociada a un usuario.
 *
 * @name GET /sensor/medida
 * @function
 * @memberof /sensor
 * @param {function} sensorController.ultimaMedidaGet - Controlador para la solicitud GET.
 */
router.route('/medida').post(sensorController.ultimaMedidaGet)

/**
 * Ruta para actualizar la información de un usuario.
 *
 * @name PUT /sensor/usuarioUpdate
 * @function
 * @memberof /sensor
 * @param {function} sensorController.usuarioUpdate - Controlador para la solicitud PUT.
 */
router.route('/usuarioUpdate').put(sensorController.usuarioUpdate)

/**
 * Exporta el enrutador configurado para el recurso 'sensor' para su uso en la aplicación Express.
 * @module router
 */
module.exports = router;