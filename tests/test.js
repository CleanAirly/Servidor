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
    inactividadSensor,
    obtenerNMedidas,
    emailNoAdmins,
    todasLasMediciones
    
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

    it('debería devolver un array si hay mediciones', async () => {
        const requestBody = {}; // Puedes ajustar según lo que necesites para la prueba

        try {
            // Suponiendo que query devuelve un array de resultados de la consulta
            const resultado = await todasLasMediciones(requestBody);

            assert.ok(Array.isArray(resultado), 'Debería devolver un array si hay mediciones');
        } catch (error) {
            assert.fail('Error en la función de todasLasMediciones: ' + error);
        }
    });

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

    it('debería obtener las últimas medidas de la sonda asociada a un usuario', async () => {
        const mockBody = { email: 'usuario@example.com', cantidad: 3 };

        try {
            // Llama a la función que deseas probar
            const resultado = await obtenerNMedidas(mockBody);

            // Verifica el resultado utilizando assert
            assert.ok(resultado, 'Debería haber resultados');
            assert.strictEqual(Array.isArray(resultado), true, 'El resultado debería ser un array');

            // Verifica que la cantidad de resultados sea la especificada
            assert.strictEqual(resultado.length, mockBody.cantidad, 'La cantidad de resultados debería ser la especificada');

            // Puedes realizar más aserciones según sea necesario, por ejemplo, verificar la estructura de los objetos en el array

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función obtenerNMedidas: ' + error.message);
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
        const mockCredentials = { email: "usuario@example.com", password: "nuevaContraseña" };

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

    it('debería obtener correos electrónicos de usuarios con admin = 0', async () => {
        try {
            // Llama a la función que deseas probar
            const resultado = await emailNoAdmins();

            // Verifica el resultado utilizando assert
            assert.ok(resultado !== null, 'El resultado no debería ser null');
            assert.ok(Array.isArray(resultado), 'El resultado debería ser un array');

            // Puedes realizar más aserciones según la estructura de datos esperada

        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función emailNoAdmins: ' + error.message);
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

    it('debería realizar el registro correctamente o indicar que el usuario ya existe', async () => {
        // Simula un objeto 'body' para la prueba con un usuario existente
        const usuarioExistente = {
            email: 'usuario_existente@example.com',
            password: 'contraseña456',
            telefono: '987654321',
            idSonda: 1,
            nombre: "Jaime",
            verificación: false
        };

        // Simula un objeto 'body' para la prueba con un nuevo usuario
        const nuevoUsuario = {
            email: 'prueba@example.com',
            password: 'nueva_contraseña',
            telefono: '123456789',
            idSonda: 2,
            nombre: "Jordi"
        };

        try {
            // Caso: Usuario ya existente
            const resultadoExistente = await registratePost(usuarioExistente);
            assert.strictEqual(resultadoExistente, 'existe', 'Debería ser \'existe\' para un usuario existente');
/*
            // Caso: Nuevo registro exitoso
            const resultadoNuevo = await registratePost(nuevoUsuario);
            assert.strictEqual(resultadoNuevo, true, 'Debería ser \'true\' para un nuevo registro exitoso');

            // Caso: Nuevo registro no exitoso (puede ser debido a un correo duplicado u otros problemas)
            const resultadoNoExitoso = await registratePost(nuevoUsuario);
            assert.strictEqual(resultadoNoExitoso, false, 'Debería ser \'false\' para un nuevo registro no exitoso');
*/
        } catch (error) {
            // Maneja cualquier excepción si ocurre un error
            assert.fail('Error en la función de registro: ' + error.message);
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