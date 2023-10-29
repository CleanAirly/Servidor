const assert = require('assert');
const {
    addValue,
    allValues,
    deleteValue,
    getLastInsertedId,
    loginGet,
    nombreUsuarioGet,
    ultimaMedidaGet,
    usuarioUpdate
} = require('../src/services/sensorService.js'); // Asegúrate de proporcionar la ruta correcta

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
        const mockUpdateData = { password: 'nuevaContrasena', nombre: 'Nuevo Nombre', email: 'usuario@example.com' };

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
});