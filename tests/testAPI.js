const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server.js'); // Asegúrate de importar tu aplicación o servidor correctamente
const expect = chai.expect;
const assert = require('assert');
const sinon = require('sinon');

chai.use(chaiHttp);

// Utiliza sinon para simular la respuesta de ultimaMedidaGet
const ultimaMedidaGetMock = sinon.stub();

// Configura el mock para devolver una medida con la fecha actual menos 2 minutos
const fechaActualMenosDosMinutos = new Date(new Date() - 2 * 60 * 1000);
ultimaMedidaGetMock.resolves({ instante: fechaActualMenosDosMinutos });

describe('Pruebas de la API REST', () => {
    it('debería obtener datos desde el servidor local', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
        }

        chai.request(app)
            .post('/api/sensor/') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta
                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería obtener mediciones del día actual desde el servidor', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
        };

        chai.request(app)
            .post('/api/sensor/medidaHoy') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Añade más aserciones según la respuesta de tu API y la estructura de datos esperada
                expect(res.body).to.be.an('array'); // Suponiendo que las mediciones se devuelven como un array

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería hacer una solicitud POST a la API', (done) => {
        const requestBody = { idSonda: 1, lugar: 'Ubicación', valor: 3535, idContaminante: 1, email: 'usuario@example.com' };
;

        chai.request(app)
            .post('/api/sensor/value') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });

    });

    it('debería autenticar un usuario', (done) => {
        const requestBody = { email: "usuario@example.com", password: "contrasena" }
        chai.request(app)
            .post('/api/sensor/login') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería registrar un usuario', (done) => {
        const requestBody = { email: "usuario@example.com", password: "contrasena" }
        

        chai.request(app)
            .post('/api/sensor/registrate') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería obtener el nombre de un usuario', (done) => {
        const requestBody = { email: "usuario@example.com", password: "contrasena" }
        chai.request(app)
            .post('/api/sensor/usuario') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería obtener la última medida de la sonda', (done) => {
        const requestBody = { email: "usuario@example.com", password: "contrasena" }
        chai.request(app)
            .post('/api/sensor/medida') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería actualizar la información de un usuario', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
            telefono: '666666661',
            nombre: 'Nuevo Nombre',
        };

        chai.request(app)
            .put('/api/sensor/usuarioUpdate') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('deberia de eliminar el último post hecho en el test', (done) => {
        const requestBody = { email: "usuario@example.com", password: "contrasena" }
        chai.request(app)
            .delete('/api/sensor/delete') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta

                // Realiza más aserciones según sea necesario

                done(); // Indica que la prueba ha finalizado
            });
    });

    it('debería devolver true para una contraseña válida', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'nuevaContraseña',
        };

        chai.request(app)
            .post('/api/sensor/comprobarPassword') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200); // Verifica el código de estado de respuesta
                assert.ok(res.body === true, 'Debería devolver true para una contraseña válida');
                done();
            });
    });

    it('debería devolver false para una contraseña inválida', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'contraseñaIncorrecta',
        };

        chai.request(app)
            .post('/api/sensor/comprobarPassword') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200); // Verifica el código de estado de respuesta
                assert.ok(res.body === false, 'Debería devolver false para una contraseña inválida');
                done();
            });
    });

    it('debería indicar que el usuario ya existe', (done) => {
        const requestBody = {
            email: 'usuario_existente@example.com',
            password: 'contraseña456',
            telefono: '987654321'
        };

        chai.request(app)
            .post('/api/sensor/registrate') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200); // Verifica el código de estado de respuesta
                assert.ok(res.body === 'existe', 'Debería devolver \'existe\' para un usuario existente');
                done();
            });
    });

    it('debería devolver true para una actualización exitosa', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
            contraseña: 'nuevaContraseña',
        };

        chai.request(app)
            .put('/api/sensor/cambiarPassword') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200); // Verifica el código de estado de respuesta
                assert.ok(res.body === true, 'Debería devolver true para una actualización exitosa');
                done();
            });
    });

    it('debería devolver false si no se encuentra un usuario con el correo electrónico proporcionado', (done) => {
        const requestBody = {
            email: 'kdjdjdjdj@example.com',
            contraseña: 'nuevaContraseña',
        };

        chai.request(app)
            .put('/api/sensor/cambiarPassword') // Ajusta la ruta según tu API
            .send(requestBody)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200); // Verifica el código de estado de respuesta
                assert.ok(res.body === false, 'Debería devolver false para un usuario no existente');
                done();
            });
    });

    it('debería devolver true si ha pasado más de 1 minuto desde la última medida', (done) => {
        chai.request(app)
            .post('/api/sensor/inactividadSensor') // Ajusta la ruta según tu API
            .send({ email: 'usuario@example.com' })
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200);
                assert.ok(res.body === false, 'Debería devolver true para una inactividad de más de 1 minuto');
                done();
            });
    });

    it('debería devolver false si no hay medidas para el usuario', (done) => {
        // Configura el mock para devolver null, simulando que no hay medidas para el usuario
        ultimaMedidaGetMock.resolves(null);

        chai.request(app)
            .post('/api/sensor/inactividadSensor') // Ajusta la ruta según tu API
            .send({ email: 'usuarioSinMedidas@example.com' })
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.status, 200);
                assert.ok(res.body === false, 'Debería devolver false para un usuario sin medidas');
                done();
            });
    });

});
