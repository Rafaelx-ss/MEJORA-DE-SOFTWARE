
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
    let saldoTarjetaCredito = 1.10;
    saldoTarjetaCredito = usuarioDatos.saldoTarjetaCredito;
    let montoMinimo = 1.10;
    montoMinimo = saldoTarjetaCredito * 0.05;

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


            let monto = montoMinimo;
            const concepto = `Tarjeta de Credito - Pago Minimo`
 
            var fechaU = new Date();
            var hora = fechaU.getHours();
            var minutos = fechaU.getMinutes();
            var dia = fechaU.getDate();
            var mes = fechaU.getMonth() + 1;
            var anio = fechaU.getFullYear();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }
            var fecha = hora + ':' + minutos + ' ' + dia + '/' + mes + '/' + anio;

            const idUser = usuarioDatos.id;

            const respuestaMov = await fetch('/MovimientosCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, concepto, monto, fecha}),
            });
            const datosMov = await respuestaMov.json();



            

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
    const saldoTarjetaCredito = usuarioDatos.saldoTarjetaCredito;
    const montoIntereses = saldoTarjetaCredito * 0.7;

    try {
        const response = await fetch('/realizarPagoIntereses', {
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


                        
            let monto = montoIntereses;
            const concepto = `Tarjeta de Credito - Pago para no generar intereses`
 
            var fechaU = new Date();
            var hora = fechaU.getHours();
            var minutos = fechaU.getMinutes();
            var dia = fechaU.getDate();
            var mes = fechaU.getMonth() + 1;
            var anio = fechaU.getFullYear();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }
            var fecha = hora + ':' + minutos + ' ' + dia + '/' + mes + '/' + anio;

            const idUser = usuarioDatos.id;

            const respuestaMov = await fetch('/MovimientosCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, concepto, monto, fecha}),
            });
            const datosMov = await respuestaMov.json();



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


            const concepto = `Tarjeta de Credito - Pago Total`
 
            var fechaU = new Date();
            var hora = fechaU.getHours();
            var minutos = fechaU.getMinutes();
            var dia = fechaU.getDate();
            var mes = fechaU.getMonth() + 1;
            var anio = fechaU.getFullYear();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }
            var fecha = hora + ':' + minutos + ' ' + dia + '/' + mes + '/' + anio;

            const idUser = usuarioDatos.id;

            const respuestaMov = await fetch('/MovimientosCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUser, concepto, monto, fecha}),
            });
            const datosMov = await respuestaMov.json();


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