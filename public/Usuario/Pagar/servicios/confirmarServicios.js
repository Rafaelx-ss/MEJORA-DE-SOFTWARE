document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    
    document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    

    if (optionServicio.optionServicio == "cfe") {
        document.getElementById('imagenServicio').src = '../../../img/CFE.png';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoCFE}`;
    }
    else if (optionServicio.optionServicio == "telmex") {
        document.getElementById('imagenServicio').src = '../../../img/TELMEX.png';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoTelmex}`;
    }
    else if (optionServicio.optionServicio == "japay") {
        
        let imagen = document.getElementById('imagenServicio');
        imagen.src = '../../../img/JAPAY.png';
        imagen.style = 'height: 8em;';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoJapay}`;
    }
    else if (optionServicio.optionServicio == "totalplay") {
        let imagen = document.getElementById('imagenServicio');
        imagen.src = '../../../img/TOTALPLAY.png';
        imagen.style = 'height: 9em;';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoTotalPlay}`;

    }
    else if (optionServicio.optionServicio == "telcel") {
        document.getElementById('imagenServicio').src = '../../../img/TELCEL.png';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoTelcel}`;
    }
});



document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = './servicios.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});



document.getElementById('pagar').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    const nombres = usuarioDatos.nombres + " " + usuarioDatos.apellidoPaterno + " " + usuarioDatos.apellidoMaterno;

    let optionPagoServicio = "";
    let monto = 0;

    if (optionServicio.optionServicio == "cfe") {
        optionPagoServicio = "pagoCFE";
        monto = usuarioDatos.pagoCFE;
    }
    else if (optionServicio.optionServicio == "telmex") {
        optionPagoServicio = "pagoTelmex";
        monto = usuarioDatos.pagoTelmex;
    }
    else if (optionServicio.optionServicio == "japay") {
        optionPagoServicio = "pagoJapay";
        monto = usuarioDatos.pagoJapay;
    }
    else if (optionServicio.optionServicio == "totalplay") {
        optionPagoServicio = "pagoTotalPlay";
        monto = usuarioDatos.pagoTotalPlay;
    }
    else if (optionServicio.optionServicio == "telcel") {
        optionPagoServicio = "pagoTelcel";
        monto = usuarioDatos.pagoTelcel;
    }

    try {
        const response = await fetch('/realizarPagoServicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ optionPagoServicio, tarjetaDebito, monto }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Pago:\n\nTitular: ${nombres}\nNúmero de Tarjeta: ${tarjetaDebito}\nServicio pagado: ${optionPagoServicio}\nMonto pagado: $${monto}\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
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

            window.location.href = '../menu_pagos.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Agregamos este registro
        alert('Error al conectar con el servidor.');
    }
});




