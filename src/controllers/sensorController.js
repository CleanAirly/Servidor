/**
 * @fileoverview Controlador de rutas para el recurso 'sensor'.
 * @description Este archivo contiene funciones para manejar las solicitudes relacionadas con el recurso 'sensor'.
 */

// Importación de módulos requeridos
const httpStatus = require('http-status');
const { sensorService } = require('../services')

/**
 * @namespace sensorController
 * @description Controlador de rutas para el recurso 'sensor'.
 */
const sensorController = {
    /**
     * Sube un nuevo valor de sensor.
     *
     * @function
     * @name uploadValue
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async uploadValue(req, res, next) {
        try {
            const value = await sensorService.addValue(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    async medicionesHoyGet(req, res, next) {
        try {
            const value = await sensorService.medicionesHoyGet(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    async obtenerNMedidas(req, res, next) {
        try {
            const value = await sensorService.obtenerNMedidas(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    async emailNoAdmins(req, res, next) {
        try {
            const value = await sensorService.emailNoAdmins(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    /**
     * Registra un nuevo usuario.
     *
     * @function
     * @name registratePost
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async registratePost(req, res, next) {
        try {
            const value = await sensorService.registratePost(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    async comprobarContraseña(req, res, next) {
        try {
            const value = await sensorService.comprobarContraseña(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    /**
     * Actualiza la información de un usuario.
     *
     * @function
     * @name usuarioUpdate
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async usuarioUpdate(req, res, next) {
        try {
            const value = await sensorService.usuarioUpdate(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },

    async cambiarPassword(req, res, next) {
        try {
            const value = await sensorService.cambiarPassword(req.body);
            res.json(value);
        } catch (error) {
            next(error)
        }
    },


    /**
     * Obtiene todos los valores de sensores.
     *
     * @function
     * @name getValues
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async getValues(req, res, next) {
        try {
            const values = await sensorService.allValues(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    },

    /**
     * Realiza la autenticación de un usuario.
     *
     * @function
     * @name loginGet
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async loginGet(req, res, next) {
        try {
            const values = await sensorService.loginGet(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    },

    /**
     * Obtiene el nombre y apellidos de un usuario.
     *
     * @function
     * @name nombreUsuarioGet
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async nombreUsuarioGet(req, res, next) {
        try {
            const values = await sensorService.nombreUsuarioGet(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    },

    async inactividadSensor(req, res, next) {
        try {
            const values = await sensorService.inactividadSensor(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    },

    /**
     * Obtiene la última medida de la sonda asociada a un usuario.
     *
     * @function
     * @name ultimaMedidaGet
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async ultimaMedidaGet(req, res, next) {
        try {
            const values = await sensorService.ultimaMedidaGet(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    },

    /**
     * Elimina un valor de sensor.
     *
     * @function
     * @name deleteValue
     * @memberof sensorController
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     * @param {function} next - Función para pasar al siguiente middleware.
     */
    async deleteValue(req, res, next) {
        try {
            const values = await sensorService.deleteValue(req.body)
            res.json(values)
        } catch (error) {
            next(error)
        }
    }
}

/**
 * Exporta el controlador de rutas para el recurso 'sensor'.
 * @module sensorController
 */
module.exports = sensorController;
