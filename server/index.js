const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de la conexión a MySQL
const sqlConfig = {
    host: 'localhost',
    user: 'solisrafael895@gmail.com', 
    password: '0612', 
    database: 'clientesBank'
};

// Función para obtener la conexión a la base de datos
async function getConnection() {
    return await mysql.createConnection(sqlConfig);
}

// Endpoint: Verificar usuario
app.post('/verifyUser', async (req, res) => {
    try {
        const connection = await getConnection();
        const { tarjetaDebito } = req.body;
        const [rows] = await connection.execute('SELECT * FROM clientesCuenta WHERE tarjetaDebito = ?', [tarjetaDebito]);

        if (rows.length > 0) {
            res.send({ exists: true, result: rows });
        } else {
            res.send({ exists: false });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

// Endpoint: Realizar depósito
app.post('/realizarDeposito', async (req, res) => {
    try {
        const connection = await getConnection();
        const { tarjetaDebito, monto } = req.body;

        const [result] = await connection.execute('UPDATE clientesCuenta SET saldoTarjetaDebito = saldoTarjetaDebito + ? WHERE tarjetaDebito = ?', [monto, tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Realizar pago mínimo
app.post('/realizarPagoMinimo', async (req, res) => {
    try {
        const connection = await getConnection();
        const { tarjetaDebito, montoMinimo } = req.body;

        const [result] = await connection.execute('UPDATE clientesCuenta SET saldoTarjetaCredito = saldoTarjetaCredito - ? WHERE tarjetaDebito = ?', [montoMinimo, tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Realizar pago total
app.post('/realizarPagoTotal', async (req, res) => {
    try {
        const connection = await getConnection();
        const { tarjetaDebito } = req.body;

        const [result] = await connection.execute('UPDATE clientesCuenta SET saldoTarjetaCredito = 0 WHERE tarjetaDebito = ?', [tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Cambiar NIP
app.post('/cambiarNip', async (req, res) => {
    try {
        const connection = await getConnection();
        const { nipValue, tarjetaDebito } = req.body;

        const [result] = await connection.execute('UPDATE clientesCuenta SET pinTarjeta = ? WHERE tarjetaDebito = ?', [nipValue, tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el NIP." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Realizar retiro
app.post('/realizarRetiro', async (req, res) => {
    try {
        const connection = await getConnection();
        const { tarjetaDebito, monto } = req.body;

        const [result] = await connection.execute('UPDATE clientesCuenta SET saldoTarjetaDebito = saldoTarjetaDebito - ? WHERE tarjetaDebito = ?', [monto, tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Registrar movimientos en la cuenta
app.post('/MovimientosCuenta', async (req, res) => {
    try {
        const connection = await getConnection();
        const { idUser, concepto, monto, fecha } = req.body;

        const [result] = await connection.execute('INSERT INTO Historial (idUsuario, Concepto, Monto, Fecha) VALUES (?, ?, ?, ?)', [idUser, concepto, monto, fecha]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo registrar el movimiento." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Endpoint: Obtener historial
app.post('/historial', async (req, res) => {
    try {
        const connection = await getConnection();
        const { idUser } = req.body;
        const [rows] = await connection.execute('SELECT * FROM Historial WHERE idUsuario = ?', [idUser]);

        if (rows.length > 0) {
            res.send({ exists: true, result: rows });
        } else {
            res.send({ exists: false });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

// Endpoint: Realizar pago de servicio
app.post('/realizarPagoServicio', async (req, res) => {
    try {
        const connection = await getConnection();
        const { optionPagoServicio, tarjetaDebito } = req.body;

        let query;
        switch (optionPagoServicio) {
            case "pagoCFE":
                query = 'UPDATE clientesCuenta SET pagoCFE = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoTelmex":
                query = 'UPDATE clientesCuenta SET pagoTelmex = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoJapay":
                query = 'UPDATE clientesCuenta SET pagoJapay = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoTelcel":
                query = 'UPDATE clientesCuenta SET pagoTelcel = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoTotalPlay":
                query = 'UPDATE clientesCuenta SET pagoTotalPlay = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoHipotecario":
                query = 'UPDATE clientesCuenta SET pagoHipotecario = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoCarro":
                query = 'UPDATE clientesCuenta SET pagoCarro = 0 WHERE tarjetaDebito = ?';
                break;
            case "pagoColegiatura":
                query = 'UPDATE clientesCuenta SET pagoColegiatura = 0 WHERE tarjetaDebito = ?';
                break;
            default:
                return res.json({ success: false, message: "Opción de pago no válida." });
        }

        const [result] = await connection.execute(query, [tarjetaDebito]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
        await connection.end();
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
