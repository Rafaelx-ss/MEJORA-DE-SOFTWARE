import request from 'supertest';
import { expect } from 'chai'; 
import app from '../server/index.js';

describe('Pruebas de Integración - Realizar Depósito', () => {
    let server;

    before((done) => {
        server = app.listen(3001, () => {
            console.log('Servidor para pruebas iniciado en http://localhost:3001');
            done();
        });
    });

    after((done) => {
        server.close(done);
    });

    it('Debería realizar un depósito correctamente', (done) => {
        const tarjetaDebito = '5786709677231470'; 
        const monto = 500;
        request(app)
            .post('/realizarDeposito')
            .send({ tarjetaDebito, monto })
            .expect(200) 
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }
                expect(res.body).to.have.property('success').that.is.true;
                done();
            });
    });

    it('Debería verificar el saldo después del depósito', (done) => {
        const tarjetaDebito = '5786709677231470';

        request(app)
            .post('/verifyUser')
            .send({ tarjetaDebito })
            .expect(200) 
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }
                expect(res.body).to.have.property('exists').that.is.true;
                expect(res.body.result).to.be.an('array').that.is.not.empty;
                expect(res.body.result[0]).to.have.property('saldoTarjetaDebito');
                done();
            });
    });
});
