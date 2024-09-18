import { assert } from 'chai';
import sinon from 'sinon';
import * as banco from '../server/index.js'; // Importar las funciones desde index.js

describe('Pruebas Unitarias - Funciones Básicas', () => {
    it('Debería actualizar correctamente el saldo al realizar un depósito', async () => {
        const tarjetaDebito = '5786709677231470';
        const monto = 500;

        // Simulación de conexión y ejecución de consulta
        const mockConnection = {
            execute: sinon.stub().resolves([{ affectedRows: 1 }]),
            end: sinon.stub().resolves()
        };

        // Ejecutar la función realizarDeposito con la conexión simulada
        const response = await banco.realizarDeposito(mockConnection, tarjetaDebito, monto);

        // Verificar que el resultado es el esperado
        assert.isTrue(response.success, 'El depósito debería ser exitoso');
    });
});
