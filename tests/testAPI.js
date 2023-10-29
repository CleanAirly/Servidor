const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server.js'); // Asegúrate de importar tu aplicación o servidor correctamente
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pruebas de la API REST', () => {
    it('debería obtener datos desde el servidor local', (done) => {
        const requestBody = {
            email: 'usuario@example.com',
        }

        chai.request(app)
            .get('/api/sensor/') // Ajusta la ruta de acuerdo a tu API
            .send(requestBody)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200); // Verifica el código de estado de respuesta
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
            .get('/api/sensor/login') // Ajusta la ruta de acuerdo a tu API
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
            .get('/api/sensor/usuario') // Ajusta la ruta de acuerdo a tu API
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
            .get('/api/sensor/medida') // Ajusta la ruta de acuerdo a tu API
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
            password: 'nuevacontraseña',
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
});
