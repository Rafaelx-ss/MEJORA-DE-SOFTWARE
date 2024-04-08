
document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    
    document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    document.getElementById('tarjeta').textContent = `${usuarioDatos.tarjetaCredito}`;
    document.getElementById('monto').textContent = `$${usuarioDatos.saldoTarjetaCredito}`;
    const saldoTarjetaCredito = usuarioDatos.saldoTarjetaCredito;

    // Calcular los montos con dos decimales
    const montoMinimo = (saldoTarjetaCredito * 0.05).toFixed(2);
    const montoIntereses = (saldoTarjetaCredito * 0.7).toFixed(2);

    // Asignar los montos a los elementos HTML
    document.getElementById('monto-minimo').textContent = `$${montoMinimo}`;
    document.getElementById('monto-intereses').textContent = `$${montoIntereses}`;
    
});


document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = '../menu_pagos.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});



document.getElementById('pagar-minimo').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const nombres = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    try {
        const response = await fetch('/realizarPagoMinimo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarjetaDebito, montoMinimo }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Pago:\n\nTitular: ${nombres}\nOrigen de pago: ${tarjetaDebito}\nPago de tarjeta de credito. \nMonto pagado: $${montoMinimo}\n\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
            alert(reciboMensaje);
            window.location.href = '../menu_pagos.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Agregamos este registro
        alert('Error al conectar con el servidor.');
    }
});


document.getElementById('pagar-intereses').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const nombres = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    try {
        const response = await fetch('/realizarPagoMinimo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarjetaDebito, montoIntereses }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Pago:\n\nTitular: ${nombres}\nOrigen de pago: ${tarjetaDebito}\nPago de tarjeta de credito. \nMonto pagado: $${montoIntereses}\n\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
            alert(reciboMensaje);
            window.location.href = '../menu_pagos.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Agregamos este registro
        alert('Error al conectar con el servidor.');
    }
});


document.getElementById('pagar-total').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const nombres = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    const monto = usuarioDatos.saldoTarjetaCredito;
    try {
        const response = await fetch('/realizarPagoTotal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tarjetaDebito }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Pago:\n\nTitular: ${nombres}\nOrigen de pago: ${tarjetaDebito}\nPago de tarjeta de credito. \nMonto pagado: $${monto}\n\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
            alert(reciboMensaje);

            window.location.href = '../menu_pagos.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Agregamos este registro
        alert('Error al conectar con el servidor.');
    }


});



/*
//const tarjetaDebito = usuarioDatos.tarjetaDebito;
const respuesta = await fetch('/verifyUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tarjetaDebito }),
});
const datos = await respuesta.json();
localStorage.setItem('usuarioDatos', JSON.stringify(datos.result[0]));
*/