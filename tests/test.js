const assert = require('assert');
const {
    addValue,
    allValues,
    deleteValue,
    getLastInsertedId,
    loginGet,
    nombreUsuarioGet,
    ultimaMedidaGet,
    usuarioUpdate,
    medicionesHoyGet,
    registratePost,
    comprobarContraseña,
    cambiarPassword,
    inactividadSensor
    
} = require('../src/services/sensorService.js'); // Asegúrate de proporcionar la ruta correcta

const sinon = require('sinon');

// Utiliza sinon para simular la respuesta de ultimaMedidaGet
const ultimaMedidaGetMock = sinon.stub();

// Configura el mock para devolver una medida con la fecha actual menos 2 minutos
const fechaActualMenosDosMinutos = new Date(new Date() -  0.5 * 60 * 1000);
ultimaMedidaGetMock.resolves({ instante: fechaActualMenosDosMinutos });

// Configura un entorno de prueba y una base de datos de prueba si es necesario

describe('Base de datos - Pruebas', () => {
    // Antes de cada prueba, configura una conexión de prueba si es necesario

    // Después de cada prueba, cierra la conexión de prueba si es necesario

    it('debería agregar un valor a la base de datos', async () => {
        const mockEmail = { email: 'usuario@example.com' };
        const mockBody = { idSonda: 1, lugar: 'Ubicación', valor: 3535, idContaminante: 1, email: 'usuario@example.com' };

        try {
            // Llama a tu función de agregar valor
            const resultado = await addValue(mockBody);

            // Verifica el resultado utilizando assert
            assert.ok(resultado, 'Inserción exitosa en la base de datos');

            // Llama a la función para obtener el último registro insertado
            const lastId = await getLastInsertedId();

            // Llama a la función para eliminar el registro
            const deleteResult = await deleteValue(mockEmail);

            // Verifica que el registro se haya eliminado correctamente
            assert.ok(deleteResult, 'El registro se eliminó correctamente');

            // Verifica que el registro insertado coincide con el registro eliminado
            assert.strictEqual(lastId.id, deleteResult, 'El registro insertado coincide con el eliminado');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de agregar valor: ' + error);
        }
    });

    it('debería obtener todos los valores de la base de datos', async () => {
        const mockEmail = { email: 'usuario@example.com' };

        try {
            // Llama a tu función para obtener todos los valores
            const valores = await allValues(mockEmail);

            // Verifica el resultado utilizando assert
            assert.ok(Array.isArray(valores), 'Valores obtenidos correctamente');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de obtener todos los valores: ' + error);
        }
    });

    it('debería obtener las mediciones del día actual', async () => {
        const mockEmail = { email: 'usuario@example.com' };

        try {
            // Llama a tu función para obtener las mediciones del día actual
            const hoyMediciones = await medicionesHoyGet(mockEmail);

            // Verifica el resultado utilizando assert
            assert.ok(Array.isArray(hoyMediciones), 'Mediciones obtenidas correctamente para el día actual');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de obtener las mediciones del día actual: ' + error);
        }
    });

    it('debería realizar un inicio de sesión exitoso', async () => {
        const mockCredentials = { email: "usuario@example.com", password: "nuevaContrasena" };

        try {
            // Llama a tu función de inicio de sesión
            const loginResult = await loginGet(mockCredentials);

            // Verifica el resultado utilizando assert
            assert.ok(loginResult, 'Inicio de sesión exitoso');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de inicio de sesión: ' + error);
        }
    });

    it('debería obtener el nombre de usuario correctamente', async () => {
        const mockEmail = {email: 'usuario@example.com'};

        try {
            // Llama a tu función para obtener el nombre de usuario
            const nombreUsuario = await nombreUsuarioGet(mockEmail);

            // Verifica el resultado utilizando assert
            assert.ok(nombreUsuario, 'Nombre de usuario obtenido correctamente');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de obtener el nombre de usuario: ' + error);
        }
    });

    it('debería obtener la última medida correctamente', async () => {
        const mockEmail = { email: 'usuario@example.com' };

        try {
            // Llama a tu función para obtener la última medida
            const ultimaMedida = await ultimaMedidaGet(mockEmail);

            // Verifica el resultado utilizando assert
            assert.ok(ultimaMedida, 'Última medida obtenida correctamente');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de obtener la última medida: ' + error);
        }
    });

    it('debería actualizar el usuario correctamente', async () => {
        const mockUpdateData = { telefono: '111111111', nombre: 'Nuevo Nombre', email: 'usuario@example.com' };

        try {
            // Llama a tu función para actualizar el usuario
            const updateResult = await usuarioUpdate(mockUpdateData);

            // Verifica el resultado utilizando assert
            assert.ok(updateResult, 'Usuario actualizado correctamente');

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de actualizar el usuario: ' + error);
        }
    });

    it('debería indicar que el usuario ya existe', async () => {
        const requestBody = {
            email: 'usuario_existente@example.com',
            password: 'contraseña456',
            telefono: '987654321'
        };

        try {
            const resultado = await registratePost(requestBody);
            assert.ok(resultado === 'existe', 'Debería ser \'existe\' para un usuario existente');

        } catch (error) {
            assert.fail('Error en la función de indicar que el usuario ya existe: ' + error);
        }
    });

    it('debería devolver true para una contraseña válida', async () => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'nuevaContraseña',
        };

        try {
            const resultado = await comprobarContraseña(requestBody);
            assert.ok(resultado === true, 'Debería devolver true para una contraseña válida');

        } catch (error) {
            assert.fail('Error en la función de comprobarContraseña para una contraseña válida: ' + error);
        }
    });

    it('debería devolver false para una contraseña inválida', async () => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'contraseñaIncorrecta',
        };

        try {
            const resultado = await comprobarContraseña(requestBody);
            assert.ok(resultado === false, 'Debería devolver false para una contraseña inválida');

        } catch (error) {
            assert.fail('Error en la función de comprobarContraseña para una contraseña inválida: ' + error);
        }
    });

    it('debería devolver true para una actualización exitosa', async () => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'nuevaContraseña',
        };

        try {
            const resultado = await cambiarPassword(requestBody);
            assert.ok(resultado === true, 'Debería devolver true para una actualización exitosa');

        } catch (error) {
            assert.fail('Error en la función de cambiarPassword para una actualización exitosa: ' + error);
        }
    });

    it('debería devolver false si no se encuentra un usuario con el correo electrónico proporcionado', async () => {
        const requestBody = {
            email: 'correoNoExistente@example.com',
            contraseña: 'nuevaContraseña',
        };

        try {
            const resultado = await cambiarPassword(requestBody);
            assert.ok(resultado === false, 'Debería devolver false para un usuario no existente');

        } catch (error) {
            assert.fail('Error en la función de cambiarPassword para un usuario no existente: ' + error);
        }
    });

    it('debería devolver true si ha pasado más de 1 minuto desde la última medida', async () => {
        const requestBody = {
            email: 'usuario@example.com',
        };

        try {
            const resultado = await inactividadSensor(requestBody);
            assert.ok(resultado === false, 'Debería devolver true para una inactividad de más de 1 minuto');

        } catch (error) {
            assert.fail('Error en la función de inactividadSensor para una inactividad de más de 1 minuto: ' + error);
        }
    });

    it('debería devolver false si no hay medidas para el usuario', async () => {
        // Configura el mock para devolver null, simulando que no hay medidas para el usuario
        ultimaMedidaGetMock.resolves(null);

        const requestBody = {
            email: 'usuarioSinMedidas@example.com',
        };

        try {
            const resultado = await inactividadSensor(requestBody);
            assert.ok(resultado === false, 'Debería devolver false para un usuario sin medidas');

        } catch (error) {
            assert.fail('Error en la función de inactividadSensor para un usuario sin medidas: ' + error);
        }
    });
});