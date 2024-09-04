const express = require('express');
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const sqlConfig = {
    database: 'clientesBank',
    server: 'DESKTOP-J6HVQSS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};


app.post('/verifyUser', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const { tarjetaDebito } = req.body;
        const result = await sql.query`SELECT * FROM clientesCuenta WHERE tarjetaDebito = ${tarjetaDebito}`;
        
        if (result.recordset.length > 0) {
            res.send({ exists: true, result: result.recordset });
        } else {
            res.send({ exists: false });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


app.post('/realizarDeposito', async (req, res) => {
    console.log(req.body);
    
    try {
        await sql.connect(sqlConfig);
        const { tarjetaDebito, monto } = req.body;

        const result = await sql.query`UPDATE clientesCuenta SET saldoTarjetaDebito = saldoTarjetaDebito + ${monto} WHERE tarjetaDebito = ${tarjetaDebito}`;

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


app.post('/realizarPagoMinimo', async (req, res) => {
    try {
        console.log('Body de la solicitud:', req.body); 
        await sql.connect(sqlConfig);
        let { tarjetaDebito, montoMinimo } = req.body;

        let result = await sql.query`UPDATE clientesCuenta SET saldoTarjetaCredito = saldoTarjetaCredito - ${montoMinimo} WHERE tarjetaDebito = ${tarjetaDebito}`;


        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en el servidor:', err); 
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


app.post('/realizarPagoIntereses', async (req, res) => {
    try {
        console.log('Body de la solicitud:', req.body);
        await sql.connect(sqlConfig);
        let { tarjetaDebito, montoIntereses } = req.body;

        let result = await sql.query`UPDATE clientesCuenta SET saldoTarjetaCredito = saldoTarjetaCredito - ${montoIntereses} WHERE tarjetaDebito = ${tarjetaDebito}`;


        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en el servidor:', err); 
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


app.post('/realizarPagoTotal', async (req, res) => {
    try {
        console.log('Body de la solicitud:', req.body);
        await sql.connect(sqlConfig);
        const { tarjetaDebito } = req.body;

        let result = await sql.query`UPDATE clientesCuenta SET saldoTarjetaCredito = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;


        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


app.post('/cambiarNip', async (req, res) => {
    try {
        console.log('Body de la solicitud:', req.body);
        await sql.connect(sqlConfig);
        const { nipValue, tarjetaDebito } = req.body;

        let result = await sql.query`UPDATE clientesCuenta SET pinTarjeta = ${nipValue} WHERE tarjetaDebito = ${tarjetaDebito}`;


        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


app.post('/realizarRetiro', async (req, res) => {
    console.log(req.body);
    
    try {
        await sql.connect(sqlConfig);
        const { tarjetaDebito, monto } = req.body;

        const result = await sql.query`UPDATE clientesCuenta SET saldoTarjetaDebito = saldoTarjetaDebito - ${monto} WHERE tarjetaDebito = ${tarjetaDebito}`;

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});



app.post('/MovimientosCuenta', async (req, res) => {
    console.log(req.body);
    
    try {
        await sql.connect(sqlConfig);
        const { idUser, concepto, monto, fecha } = req.body;

        const result = await sql.query`INSERT INTO Historial (idUsuario, Concepto, Monto, Fecha) VALUES (${idUser}, ${concepto}, ${monto}, ${fecha})`;

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});



app.post('/historial', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const { idUser } = req.body;
        const result = await sql.query`SELECT * FROM Historial WHERE idUsuario = ${idUser}`;
        
        if (result.recordset.length > 0) {
            res.send({ exists: true, result: result.recordset });
        } else {
            res.send({ exists: false });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).send('Error al conectar con la base de datos');
    }
});


app.post('/realizarPagoServicio', async (req, res) => {
    try {
        console.log('Body de la solicitud:', req.body);
        await sql.connect(sqlConfig);
        const { optionPagoServicio, tarjetaDebito, monto } = req.body;

        let result;

        if (optionPagoServicio == "pagoCFE") {
            result = await sql.query`UPDATE clientesCuenta SET pagoCFE = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoTelmex") {
            result = await sql.query`UPDATE clientesCuenta SET pagoTelmex = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoJapay"){
            result = await sql.query`UPDATE clientesCuenta SET pagoJapay = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;  
        } else if (optionPagoServicio == "pagoTelcel") {
            result = await sql.query`UPDATE clientesCuenta SET pagoTelcel = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoTotalPlay"){
            result = await sql.query`UPDATE clientesCuenta SET pagoTotalPlay = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoHipotecario"){
            result = await sql.query`UPDATE clientesCuenta SET pagoHipotecario = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoCarro"){
            result = await sql.query`UPDATE clientesCuenta SET pagoCarro = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        } else if (optionPagoServicio == "pagoColegiatura"){
            result = await sql.query`UPDATE clientesCuenta SET pagoColegiatura = 0 WHERE tarjetaDebito = ${tarjetaDebito}`;
        }


        if (result.rowsAffected[0] > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No se pudo actualizar el saldo." });
        }
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});