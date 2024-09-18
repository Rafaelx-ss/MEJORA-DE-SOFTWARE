import request from 'supertest';
import { expect } from 'chai';
import app from '../server/index.js';

describe('Pruebas de Sistema - Aplicación Bancaria', () => {
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

    it('Debería realizar un depósito y verificar el saldo', (done) => {
        const tarjetaDebito = '5786709677231470';
        const monto = 500;

        // Realizar depósito
        request(app)
            .post('/realizarDeposito')
            .send({ tarjetaDebito, monto })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property('success').that.is.true;

                // Verificar el saldo actualizado
                request(app)
                    .post('/verifyUser')
                    .send({ tarjetaDebito })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.body).to.have.property('exists').that.is.true;
                        expect(res.body.result[0]).to.have.property('saldoTarjetaDebito');
                        done();
                    });
            });
    });

    it('Debería realizar un retiro y verificar el saldo', (done) => {
        const tarjetaDebito = '5786709677231470';
        const monto = 200;

        // Realizar retiro
        request(app)
            .post('/realizarRetiro')
            .send({ tarjetaDebito, monto })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property('success').that.is.true;

                // Verificar el saldo actualizado
                request(app)
                    .post('/verifyUser')
                    .send({ tarjetaDebito })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(res.body).to.have.property('exists').that.is.true;
                        expect(res.body.result[0]).to.have.property('saldoTarjetaDebito');
                        done();
                    });
            });
    });

    it('Debería cambiar el NIP y verificar que se ha actualizado', (done) => {
        const tarjetaDebito = '5786709677231470';
        const nipValue = '1234';

        // Cambiar NIP
        request(app)
            .post('/cambiarNip')
            .send({ tarjetaDebito, nipValue })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property('success').that.is.true;
                done();
            });
    });

    it('Debería realizar un pago de servicio y verificar su estado', (done) => {
        const tarjetaDebito = '5786709677231470';
        const optionPagoServicio = 'pagoCFE';

        // Realizar pago de servicio
        request(app)
            .post('/realizarPagoServicio')
            .send({ tarjetaDebito, optionPagoServicio })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property('success').that.is.true;
                done();
            });
    });
});
