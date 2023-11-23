/**
 * @fileoverview Módulo que contiene funciones para interactuar con una base de datos MySQL.
 * @description Este módulo incluye funciones para agregar, consultar y eliminar registros de la base de datos.
 */

// Importación de módulos requeridos
const httpStatus = require('http-status');
const mysql = require('mysql')
const util = require('util');
const { all } = require('../routes');

/**
 * Configuración de conexión a la base de datos MySQL.
 * @type {object}
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ozone'
})

// Utilidad para promisificar la función query de la conexión a la base de datos
const query = util.promisify(connection.query).bind(connection);

/**
 * Agrega un nuevo valor a la base de datos asociado a un usuario por su correo electrónico.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @param {object} body - Datos del valor a agregar.
 * @throws {Error} Si se produce un error durante la inserción.
 */
const addValue = async (body) => {
    try {
        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const fecha = currentDate.toISOString().split('T')[0]; // Obtener la fecha en formato "YYYY-MM-DD"
        const hora = currentDate.toISOString().split('T')[1].split('Z')[0]; // Obtener la hora en formato "HH:MM:SS"

        // Realizar la inserción en la base de datos relacionada con el usuario
        const insertQuery = `INSERT INTO mediciones (instante, lugar, valor, idContaminante)
            VALUES (?, ?, ?, ?)`;

        const insertValues = [fecha + ' ' + hora, body.lugar, body.valor, body.idContaminante];

        const result = await query(insertQuery, [...insertValues]);

        const id = await getLastInsertedId()

        await query(`INSERT INTO usuariomedicion (email, idMedicion)
            VALUES (?, ?)`, [body.email, id.id]);

        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene todos los valores almacenados en la base de datos asociados a un usuario por su correo electrónico.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Array>} Un arreglo con los valores almacenados en la base de datos para el usuario.
 * @throws {Error} Si se produce un error durante la consulta.
 */
const allValues = async (body) => {
    try {
        // Realizar una consulta para obtener todos los valores de la tabla 'mediciones' para un usuario específico
        const valuesQuery = `SELECT m.*
FROM mediciones m
INNER JOIN usuariomedicion um ON m.idMedicion = um.idMedicion
WHERE um.email = ?`;

        const values = await query(valuesQuery, [body.email]);
        return values;
    } catch (error) {
        throw error;
    }
}

/**
 * Elimina el último valor insertado en la base de datos para un usuario por su correo electrónico.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @throws {Error} Si se produce un error durante la eliminación.
 */
const deleteValue = async (body) => {
    try {

        // Realizar una consulta SQL para eliminar el registro con el ID más alto para un usuario específico
        const deleteQuery = `DELETE FROM mediciones WHERE idMedicion = ?`;

        // Obtener el ID del último registro insertado
        const id = await getLastInsertedId()
        await query(`DELETE FROM usuariomedicion WHERE idMedicion = ${id.id}`)

        // Ejecutar la consulta con el ID proporcionado
        await query(deleteQuery, [id.id]);
        return id.id;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene el ID del último registro insertado en la base de datos para un usuario por su correo electrónico.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<object>} Objeto con el último ID insertado para el usuario.
 */
const getLastInsertedId = async () => {
    return new Promise((resolve, reject) => {
        // Ejecutar una consulta para obtener el último ID insertado
        connection.query('SELECT LAST_INSERT_ID() as lastId', (err, rows) => {
            if (err) {
                console.error('Error al obtener el último ID insertado:', err);
                reject(err); // Rechazar la promesa en caso de error
                return;
            }

            const lastId = rows[0].lastId;
            resolve({ id: lastId }); // Resolver la promesa con el ID
        });
    });
};
/**
 * Realiza una verificación de inicio de sesión en la base de datos.
 * @function
 * @async
 * @param {object} body - Datos de inicio de sesión (correo electrónico y contraseña).
 * @returns {boolean} `true` si las credenciales son válidas, `false` si no lo son.
 * @throws {Error} Si se produce un error durante la consulta.
 */
const loginGet = async (body) => {
    try {
        // Realizar una consulta para verificar las credenciales en la tabla 'usuarios'
        const queryResult = await query("SELECT * FROM usuarios WHERE email = ? AND contraseña = ?", [body.email, body.password]);

        // Si se encuentra una coincidencia, la consulta devolverá filas, de lo contrario, será un arreglo vacío
        if (queryResult.length > 0) {
            // Las credenciales son válidas

            if(queryResult[0].admin === 1){
                return "admin";

            }else{
                return true;
            }
        } else {
            // Las credenciales son inválidas
            return false;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Registra un nuevo usuario en la base de datos.
 * @function
 * @async
 * @param {object} body - Datos de registro (correo electrónico y contraseña).
 * @returns {boolean} `true` si el registro se realizó con éxito, `false` si no.
 * @throws {Error} Si se produce un error durante la inserción.
 */
const registratePost = async (body) => {
    try {

        // Realizar una consulta para verificar las credenciales en la tabla 'usuarios'
        const queryResult = await query("SELECT * FROM usuarios WHERE email = ?", [body.email]);

        // Si se encuentra una coincidencia, la consulta devolverá filas, de lo contrario, será un arreglo vacío
        if (queryResult.length > 0) {
            // Las credenciales son válidas
            return "existe";
            
        } else if (body.verificacion == false) {
            // Realiza una inserción en la tabla 'usuarios' con el correo electrónico y contraseña proporcionados
            const insertQuery = "INSERT INTO usuarios (email, contraseña, nombre, telefono) VALUES (?, ?, ?, ?)";
            const insertQuery1 = "INSERT INTO sonda (idSonda) VALUES (?)";
            const insertQuery2 = "INSERT INTO usuariosonda (email, idSonda) VALUES (?, ?)";
            const insertResult = await query(insertQuery, [body.email, body.password, body.nombre, body.telefono]);
            const insertResult1 = await query(insertQuery1, [body.idSonda]);
            const insertResult2 = await query(insertQuery2, [body.email, body.idSonda]);

            // Comprueba si la inserción fue exitosa
            if (insertResult.affectedRows > 0 && insertResult1.affectedRows > 0 && insertResult2.affectedRows > 0) {
                // La inserción se realizó con éxito, lo que significa que el usuario se registró correctamente.
                return true;
            } else {
                // La inserción no tuvo éxito, lo que podría deberse a un correo electrónico duplicado u otros problemas.
                return false;
            }
        } else {
            return "no existe";
        }

    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene el nombre y apellidos de un usuario a partir del correo electrónico.
 * @function
 * @async
 * @param {object} body - Datos del usuario (correo electrónico).
 * @returns {string|null} El nombre y apellidos del usuario o `null` si no se encuentra.
 * @throws {Error} Si se produce un error durante la consulta.
 */
const nombreUsuarioGet = async (body) => {
    try {
        // Realiza una consulta para obtener el nombre y apellidos del usuario a partir del correo electrónico
        const queryResult = await query("SELECT u.nombre, u.telefono, us.idSonda FROM usuarios u JOIN usuariosonda us ON u.email = us.email WHERE u.email = ?; ", [body.email]);
        // Comprueba si se encontraron resultados
        if (queryResult.length > 0) {
            // Devuelve el nombre y apellidos del usuario
            return queryResult[0];
        } else {
            // El correo electrónico no está asociado a un usuario existente
            return null;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene la última medida de la sonda asociada a un usuario.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @returns {object|null} La última medida de la sonda o `null` si no se encuentra.
 * @throws {Error} Si se produce un error durante la consulta.
 */
const ultimaMedidaGet = async (body) => {
    try {
        // Realiza una consulta para obtener la última medida de la sonda asociada al usuario
        const queryResult = await query(`
            SELECT m.*
            FROM mediciones m
            INNER JOIN usuariomedicion um ON m.idMedicion = um.idMedicion
            WHERE um.email = ?
            ORDER BY m.instante DESC
            LIMIT 1
        `, [body.email]);
        // Comprueba si se encontraron resultados
        if (queryResult.length > 0) {
            // Devuelve la última medida
            return queryResult[0];
        } else {
            // No se encontraron medidas para el usuario
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const obtenerNMedidas = async (body) => {
    try {
        // Realiza una consulta para obtener la última medida de la sonda asociada al usuario
        const queryResult = await query(`
            SELECT m.*
            FROM mediciones m
            INNER JOIN usuariomedicion um ON m.idMedicion = um.idMedicion
            WHERE um.email = ?
            ORDER BY m.instante DESC
            LIMIT ?
        `, [body.email, body.cantidad]);
        // Comprueba si se encontraron resultados
        if (queryResult.length > 0) {
            // Devuelve la última medida
            return queryResult;
        } else {
            // No se encontraron medidas para el usuario
            return null;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Actualiza los campos de correo electrónico, contraseña y nombre de un usuario en la base de datos.
 * @function
 * @async
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} telefono - Nueva contraseña del usuario.
 * @param {string} nombre - Nuevo nombre y apellidos del usuario.
 * @returns {boolean} `true` si la actualización se realizó con éxito, `false` si no se encontró el usuario.
 * @throws {Error} Si se produce un error durante la actualización.
 */
const usuarioUpdate = async (body) => {
    try {
        // Realiza una actualización en la tabla 'usuarios' con los nuevos valores
        const updateQuery = "UPDATE usuarios SET telefono = ?, nombre = ? WHERE email = ?";
        const updateResult = await query(updateQuery, [body.telefono, body.nombre, body.email]);

        // Comprueba si la actualización se realizó con éxito
        if (updateResult.affectedRows > 0) {
            // La actualización se realizó con éxito
            return true;
        } else {
            // No se encontró un usuario con el correo electrónico proporcionado
            return false;
        }
    } catch (error) {
        throw error;
    }
}

const cambiarPassword = async (body) => {
    try {
        // Realiza una actualización en la tabla 'usuarios' con los nuevos valores
        const updateQuery = "UPDATE usuarios SET contraseña = ? WHERE email = ?";
        const updateResult = await query(updateQuery, [body.contraseña, body.email]);

        // Comprueba si la actualización se realizó con éxito
        if (updateResult.affectedRows > 0) {
            // La actualización se realizó con éxito
            return true;
        } else {
            // No se encontró un usuario con el correo electrónico proporcionado
            return false;
        }
    } catch (error) {
        throw error;
    }
}

const medicionesHoyGet = async (body) => {
    try {
        // Obtener todas las mediciones sin filtrar por fecha
        const values = await allValues(body);
        // Obtener la fecha actual en formato 'YYYY-MM-DD'
        const fechaActual = new Date().toISOString().split('T')[0];

        // Filtrar las mediciones por la fecha actual
        const hoyValues = values.filter(medicion => {
            // Suponiendo que la columna de fecha se llama 'fechaMedicion'
            const fechaMedicion = new Date(medicion.instante).toISOString().split('T')[0];
            return fechaMedicion === fechaActual;
        });

        return hoyValues;
    } catch (error) {
        throw error;
    }
}

const comprobarContraseña = async (body) => {
    try {

        // Realizar una consulta para verificar las credenciales en la tabla 'usuarios'
        const queryResult = await query("SELECT contraseña FROM usuarios WHERE email = ?", [body.email]);

        // Si se encuentra una coincidencia, la consulta devolverá filas, de lo contrario, será un arreglo vacío
        if (body.contraseña == queryResult[0].contraseña) {
            // Las credenciales son válidas
            return true;
        }else{
            return false;
        }
    } catch (error) {
        throw error;
    }
}

const inactividadSensor = async (body) => {
    try {
        // Obtiene la última medición usando la función ultimaMedidaGet
        const ultimaMedida = await ultimaMedidaGet(body);

        // Verifica si se obtuvo una medida
        if (ultimaMedida) {
            // Obtiene la fecha actual
            const fechaActual = new Date();

            // Obtiene la fecha de la última medida
            const fechaUltimaMedida = new Date(ultimaMedida.instante);

            // Calcula la diferencia en milisegundos entre la fecha actual y la fecha de la última medida
            const diferenciaTiempo = fechaActual - fechaUltimaMedida;

            // Convierte la diferencia de tiempo a minutos
            const minutosTranscurridos = diferenciaTiempo / (1000 * 60);

            // Comprueba si han pasado al menos 1 minuto desde la última medida
            if (!minutosTranscurridos >= 1) {
                return "inactivo"; // Ha pasado más de 1 minuto, devuelve true
            } else {
                return "activo"; // No ha pasado 1 minuto, devuelve false
            }
        } else {
            // No se encontraron medidas para el usuario
            return "sin datos";
        }
    } catch (error) {
        throw error;
    }
}

const emailNoAdmins = async (body) => {

    try{

        const requestQuery = "SELECT email FROM usuarios WHERE admin = false";
        const queryResult = await query(requestQuery, []);

        if (queryResult.length > 0) {

            return queryResult;
        } else {

            return null;
        }

    } catch(error){
        throw error;
    }

}

/**
 * Exporta las funciones para su uso en otros módulos.
 * @module
 */
module.exports = {
    addValue,
    allValues,
    deleteValue,
    getLastInsertedId,
    loginGet,
    registratePost,
    nombreUsuarioGet,
    ultimaMedidaGet,
    usuarioUpdate,
    medicionesHoyGet,
    comprobarContraseña,
    cambiarPassword,
    inactividadSensor,
    obtenerNMedidas,
    emailNoAdmins
}